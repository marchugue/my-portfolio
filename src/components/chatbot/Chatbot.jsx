import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Suggested questions for users
const SUGGESTIONS = [
  "What are your skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "What's your experience?",
  "Tell me a joke"
];

// Rule-based responses - speaking as the developer (first person)
const getAIResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Greetings
  if (/hi|hello|hey|greetings/.test(lowerInput)) {
    return "Hey there! Welcome to my portfolio! 👋 I'm a web developer passionate about building modern, interactive web applications. Feel free to ask me about my skills, projects, or anything else you'd like to know!";
  }
  
  // Name/Who - first person
  if (/who are you|your name|who made this|about you/.test(lowerInput)) {
    return "I'm a passionate web developer who loves creating modern, interactive web applications with React and cutting-edge technologies. This portfolio showcases my work and journey in web development!";
  }
  
  // Skills/Tech Stack - first person
  if (/skill|tech|stack|technologies|languages|framework|react|javascript|tools|what do you know/.test(lowerInput)) {
    return "I specialize in React, JavaScript, TypeScript, Node.js, and modern web technologies. I'm also experienced with Tailwind CSS, Git, Vite, and various frontend frameworks. Check out the Tech Stack section to see my full skill set!";
  }
  
  // Projects - first person
  if (/project|portfolio work|what (have you built|did you make)|showcase|demo|github/.test(lowerInput)) {
    return "I've built several exciting projects including web applications, interactive UIs, and full-stack solutions. Each project demonstrates different skills and technologies I've learned. Check out the Projects section to see live demos and my GitHub repositories!";
  }
  
  // Contact - first person
  if (/contact|hire|work with you|email|reach|get in touch|collaboration/.test(lowerInput)) {
    return "I'd love to hear from you! You can reach out through the Contact section. I'm always open to discussing new opportunities, freelance work, collaborations, or just chatting about web development!";
  }
  
  // Experience - first person
  if (/experience|background|work history|career|job|professional/.test(lowerInput)) {
    return "I have experience building modern web applications, from frontend interfaces to full-stack solutions. I'm passionate about clean code, user experience, accessibility, and I'm always learning new technologies to stay current!";
  }
  
  // Resume/CV - first person
  if (/resume|cv|download/.test(lowerInput)) {
    return "You can download my resume from the Contact section. It has all the details about my skills, experience, education, and professional background. Feel free to check it out!";
  }
  
  // Help
  if (/help|what can you do|assist|support/.test(lowerInput)) {
    return "I can tell you about my skills, projects, experience, or how to contact me. Just ask away - I'm here to help you learn more about my work!";
  }
  
  // Time
  if (/time|date|what time is it/.test(lowerInput)) {
    return `It's currently ${new Date().toLocaleTimeString()}. Thanks for stopping by my portfolio!`;
  }
  
  // Jokes
  if (/joke|funny|humor|make me laugh/.test(lowerInput)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "I would tell you a UDP joke, but you might not get it. 📡",
      "Why do JavaScript developers wear glasses? Because they don't C#! 👓",
      "What's a computer's favorite snack? Microchips! 🍟",
      "Why was the function sad? It didn't get any callbacks! 📞"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Thanks
  if (/thank|thanks|appreciate/.test(lowerInput)) {
    return "You're welcome! Feel free to ask if you have any other questions. I'm happy to chat! 😊";
  }
  
  // Goodbye
  if (/bye|goodbye|see you|later/.test(lowerInput)) {
    return "Goodbye! Thanks for visiting my portfolio. Have a great day! 👋 Feel free to come back anytime!";
  }
  
  // Fallback - first person
  return "That's an interesting question! I can tell you about my projects, skills, or experience. What would you like to explore?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hey there! 👋 Welcome to my portfolio! I\'m the developer behind this site. Ask me about my skills, projects, or just say hi!' }
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

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate typing delay for natural feel, then respond
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
      setIsLoading(false);
    }, 600 + Math.random() * 400);
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
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageSquare size={20} className="sm:w-6 sm:h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-[400px] h-[70vh] sm:h-[500px] max-h-[600px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center gap-2">
              <Bot size={20} className="text-white" />
              <span className="text-white font-semibold">Chat with Me</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
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
                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 py-2 text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {/* Suggestion Chips - appear after each bot message when not loading */}
              {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'model' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {SUGGESTIONS.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(suggestion);
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors border border-gray-700 hover:border-gray-600"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
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
                  className="flex-1 bg-gray-800 text-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
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
