import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React JS', level: 90, color: 'from-cyan-400 to-blue-500' },
        { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-orange-500' },
        { name: 'HTML/CSS', level: 90, color: 'from-orange-400 to-red-500' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'PHP', level: 85, color: 'from-indigo-400 to-purple-500' },
        { name: 'Python', level: 80, color: 'from-yellow-400 to-green-500' },
        { name: 'Java', level: 75, color: 'from-red-400 to-orange-500' },
        { name: 'MySQL', level: 85, color: 'from-blue-400 to-cyan-500' },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'C++', level: 70, color: 'from-blue-500 to-indigo-600' },
        { name: 'Figma', level: 80, color: 'from-pink-400 to-purple-500' },
        { name: 'Git', level: 85, color: 'from-orange-500 to-red-500' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="tech" className="py-16 sm:py-24 px-4 sm:px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
            My Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-3 sm:mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Technologies I've mastered to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {technologies.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 card-lift"
            >
              <h3 className="text-xl font-semibold mb-6 text-white">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                      >
                        <motion.div
                          animate={{ x: [0, 20, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-center text-gray-400 mb-8 text-sm uppercase tracking-wider">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {['React', 'PHP', 'Python', 'Java', 'MySQL', 'C++', 'Figma', 'JavaScript'].map(
                (tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-5 py-3 rounded-xl bg-dark-700/50 border border-dark-600 text-gray-300 font-medium hover:border-primary-500/50 hover:text-primary-400 transition-all cursor-default"
                  >
                    {tech}
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
