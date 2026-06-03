import { motion } from 'framer-motion';
import { Github, Facebook, Mail, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('tech');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 pt-16 sm:pt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-3 sm:mb-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-primary-400 text-xs sm:text-sm font-medium">
                Available for work
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text text-glow">Marc Kian</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-400 mb-4 sm:mb-6"
            >
              First Year Student & Full Stack Developer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              18-year-old first year student passionate about building innovative solutions that 
              bridge software and hardware. Specialized in full-stack web development, REST APIs, 
              JWT authentication, and creating secure, scalable applications.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium text-sm sm:text-base flex items-center gap-2 btn-shine glow-blue"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl glass text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              {[
                { icon: Github, href: 'https://github.com/marchugue', label: 'GitHub' },
                { icon: Facebook, href: 'https://www.facebook.com/kiannimida.5545', label: 'Facebook' },
                { icon: Mail, href: 'mailto:marchugue828@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 sm:p-3 rounded-xl glass text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              <div className="absolute inset-0 -m-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-3xl border border-primary-500/20"
                  style={{ transform: 'rotate(5deg)' }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-3xl border border-purple-500/20"
                  style={{ transform: 'rotate(-5deg)' }}
                />
              </div>

              <motion.div
                className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden glass glow-blue"
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
                      <div className="w-full h-full rounded-full bg-dark-800 overflow-hidden">
                        <img 
                          src="/profile.jpg" 
                          alt="Marc Kian" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Marc Kian I. Hugue</p>
                    <p className="text-primary-400 text-[10px] sm:text-xs mt-1 sm:mt-2">Developer & IoT Enthusiast</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 glass">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">First Year Student</p>
                      <p className="text-primary-400 text-[10px] sm:text-xs">Full Stack Developer</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] sm:text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl glass bg-primary-500/20"
              >
                <span className="text-primary-400 text-xs sm:text-sm font-medium">React.js</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl glass bg-purple-500/20"
              >
                <span className="text-purple-400 text-xs sm:text-sm font-medium">IoT Expert</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full glass text-gray-400 hover:text-white transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
