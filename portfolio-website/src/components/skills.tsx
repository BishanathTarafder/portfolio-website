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
    <section id="skills" className="py-24 bg-AAprimary">
      <div className="container mx-auto px-4 md:px-16 lg:px-32">
        <motion.h2 
          className="flex items-center font-mono text-AAsecondary text-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-AAsecondary mr-2">04.</span> Skills & Expertise
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800/30 border border-gray-700 rounded-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-AAsecondary font-mono">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skillIndex} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * skillIndex + 0.2 * index }}
                  >
                    <span className="text-AAsecondary">▹</span>
                    <span className="text-gray-300">{skill.name}</span>
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