import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Facebook } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mqejvjjd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'marchugue828@gmail.com', href: 'mailto:marchugue828@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Philippines', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/marchugue', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Facebook, href: 'https://www.facebook.com/kiannimida.5545', label: 'Facebook', color: 'hover:text-blue-500' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-3 sm:mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass hover:bg-white/10 transition-all group"
                >
                  <div className="p-2.5 sm:p-3 rounded-lg bg-primary-500/20 text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
                    <p className="text-white font-medium text-sm sm:text-base truncate">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Follow me on</p>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 sm:p-3 rounded-xl glass text-gray-400 ${social.color} transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === 'name' || formState.name ? -20 : 0,
                      scale: focusedField === 'name' || formState.name ? 0.85 : 1,
                      color: focusedField === 'name' ? '#0ea5e9' : '#6b7280',
                    }}
                    className="absolute left-3 sm:left-4 top-3 sm:top-4 text-xs sm:text-base text-gray-500 origin-left pointer-events-none transition-colors"
                  >
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm sm:text-base focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === 'email' || formState.email ? -20 : 0,
                      scale: focusedField === 'email' || formState.email ? 0.85 : 1,
                      color: focusedField === 'email' ? '#0ea5e9' : '#6b7280',
                    }}
                    className="absolute left-3 sm:left-4 top-3 sm:top-4 text-xs sm:text-base text-gray-500 origin-left pointer-events-none transition-colors"
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm sm:text-base focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === 'message' || formState.message ? -20 : 0,
                      scale: focusedField === 'message' || formState.message ? 0.85 : 1,
                      color: focusedField === 'message' ? '#0ea5e9' : '#6b7280',
                    }}
                    className="absolute left-3 sm:left-4 top-3 sm:top-4 text-xs sm:text-base text-gray-500 origin-left pointer-events-none transition-colors"
                  >
                    Your Message
                  </motion.label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm sm:text-base focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 btn-shine glow-blue disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-dark-600 text-center"
      >
        <p className="text-gray-500 text-xs sm:text-sm px-4">
          © 2024 Marc Kian I. Hugue. Built with React, Vite & Tailwind CSS.
        </p>
      </motion.footer>
    </section>
  );
};

export default Contact;
