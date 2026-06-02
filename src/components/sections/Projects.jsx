import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Radio, Cpu, Shield, ExternalLink } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'VIOTrack',
      subtitle: 'RFID-Based Vehicle Tracking System',
      description:
        'A comprehensive vehicle tracking system built with Layered (N-Tier) Architecture. Features JWT-based authentication middleware, secure PHP REST API for CRUD operations between backend and frontend, RFID scanning integration, and a responsive React dashboard.',
      tech: ['React JS', 'PHP', 'MySQL', 'JWT', 'REST API', 'RFID'],
      icon: Radio,
      color: 'from-cyan-500 to-blue-600',
      accent: 'cyan',
      image: '/placeholder-viotrack.svg',
    },
    {
      id: 2,
      title: 'IoT Sensor Hub',
      subtitle: 'Environmental Monitoring System',
      description:
        'A distributed sensor network for monitoring temperature, humidity, and air quality. Data is collected and visualized in real-time through a web interface.',
      tech: ['Python', 'C++', 'MySQL', 'React JS'],
      icon: Cpu,
      color: 'from-purple-500 to-pink-600',
      accent: 'purple',
      image: '/placeholder-iot.svg',
    },
    {
      id: 3,
      title: 'SecureAuth',
      subtitle: 'Multi-Factor Authentication System',
      description:
        'A secure authentication platform implementing various MFA methods including SMS, email, and hardware tokens for enterprise applications.',
      tech: ['Java', 'PHP', 'MySQL', 'React JS'],
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      accent: 'green',
      image: '/placeholder-auth.svg',
    },
  ];

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    
    if (normalizedDiff === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'blur(0px)',
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -2) {
      return {
        x: 520,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 20,
        filter: 'blur(3px)',
      };
    } else {
      return {
        x: -520,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 20,
        filter: 'blur(3px)',
      };
    }
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-medium uppercase tracking-wider">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Showcasing innovative solutions where software meets hardware
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center min-h-[600px]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevProject}
            className="absolute left-0 z-40 p-3 rounded-full glass text-white hover:bg-primary-500/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextProject}
            className="absolute right-0 z-40 p-3 rounded-full glass text-white hover:bg-primary-500/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="relative w-full max-w-xl flex items-center justify-center">
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: style.filter,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: style.zIndex }}
                  className="absolute w-full"
                >
                  <div className={`glass rounded-2xl overflow-hidden ${isActive ? 'glow-blue' : ''}`}>
                    <div className="h-56 bg-gradient-to-br from-dark-800 to-dark-700 relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80`} />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
                      
                      <motion.div
                        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-4 left-4 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <project.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {isActive && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className={`text-${project.accent}-400 text-base mb-4`}>
                        {project.subtitle}
                      </p>
                      
                      <p className="text-gray-400 text-base mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-md bg-dark-700 text-gray-300 text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex gap-4"
                        >
                          <a
                            href="https://github.com/marchugue"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-5 py-3 rounded-lg bg-dark-700 text-white font-medium flex items-center justify-center gap-2 hover:bg-dark-600 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                            View Code
                          </a>
                          <button className="flex-1 px-5 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium flex items-center justify-center gap-2">
                            <ExternalLink className="w-5 h-5" />
                            Live Demo
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-8 bg-primary-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
