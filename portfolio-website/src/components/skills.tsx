'use client';

import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Machine Learning',
    skills: [
      { name: 'Supervised & Unsupervised Learning' },
      { name: 'Deep Learning (CNN, RNN, Transformers)' },
      { name: 'Model Optimization & Deployment' },
      { name: 'TensorFlow, PyTorch, Scikit-learn' },
    ],
  },
  {
    title: 'Data Engineering',
    skills: [
      { name: 'Data Processing & ETL Pipelines' },
      { name: 'SQL & NoSQL Databases' },
      { name: 'Big Data Technologies (Spark, Hadoop)' },
      { name: 'Data Visualization (Matplotlib, Plotly)' },
    ],
  },
  {
    title: 'Software Development',
    skills: [
      { name: 'Python, JavaScript/TypeScript' },
      { name: 'RESTful APIs & Microservices' },
      { name: 'CI/CD & DevOps' },
      { name: 'Cloud Platforms (AWS, GCP, Azure)' },
    ],
  },
];

export function Skills() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">{category.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skillIndex} 
                    className="flex items-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * skillIndex + 0.2 * index }}
                  >
                    <span className="w-2 h-2 bg-AAsecondary rounded-full"></span>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}