import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || null;
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

// Fallback rule-based responses when API is unavailable
const getFallbackResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  if (/hi|hello|hey/.test(lowerInput)) {
    return "Hello! Welcome to this portfolio. I'm currently running in offline mode due to network issues, but I can still help answer basic questions!";
  }
  if (/skill|tech|stack|react|javascript/.test(lowerInput)) {
    return "The developer specializes in React, JavaScript, TypeScript, Node.js, Tailwind CSS, and modern web technologies.";
  }
  if (/project|work|portfolio/.test(lowerInput)) {
    return "This portfolio showcases web applications, interactive UIs, and full-stack projects. Check the Projects section!";
  }
  if (/contact|hire|email/.test(lowerInput)) {
    return "You can reach out through the Contact section. The developer is open to new opportunities!";
  }
  
  return "I'm running in offline mode right now. Please check your network connection to use the full AI assistant, or ask about skills, projects, or contact info.";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi! I\'m your AI assistant powered by Hugging Face. Ask me about this portfolio or anything else!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add auth header if API key is provided (increases rate limits)
      if (HF_API_KEY) {
        headers['Authorization'] = `Bearer ${HF_API_KEY}`;
      }

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            inputs: `<s>[INST] You are a helpful AI assistant for a portfolio website. Be concise (2-3 sentences). 

User: ${userMessage}
Assistant:[/INST]`,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.7,
              top_p: 0.9,
              return_full_text: false
            }
          })
        }
      );

      if (!response.ok) {
        // Handle rate limiting - suggest getting a free API key
        if (response.status === 429) {
          throw new Error('Rate limit reached. Consider adding a free Hugging Face API key for higher limits, or try again in a moment.');
        }
        throw new Error('Failed to get response from Hugging Face');
      }

      const data = await response.json();
      
      // Extract the generated text
      let aiResponse = '';
      if (Array.isArray(data) && data[0]?.generated_text) {
        aiResponse = data[0].generated_text.trim();
      } else if (data.generated_text) {
        aiResponse = data.generated_text.trim();
      } else {
        aiResponse = "I'm not sure how to answer that. Could you try rephrasing your question?";
      }

      // Clean up any remaining instruction tokens
      aiResponse = aiResponse.replace(/\[\/?INST\]/g, '').replace(/<s>|<\/s>/g, '').trim();

      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('HF Inference error:', error);
      
      // Use fallback response when API fails
      const fallbackResponse = getFallbackResponse(userMessage);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: fallbackResponse + '\n\n_(Offline mode - HF API unavailable)_' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center gap-2">
              <Bot size={20} className="text-white" />
              <span className="text-white font-semibold">AI Assistant</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!HF_API_KEY && messages.length === 1 && (
                <div className="bg-blue-900/40 border border-blue-700/50 rounded-lg p-2 text-blue-200 text-xs">
                  💡 Running on Hugging Face free tier. Add an API key for higher rate limits.
                </div>
              )}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
