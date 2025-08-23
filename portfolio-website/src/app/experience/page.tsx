'use client';

import Layout from '@/components/layout';
import { motion } from 'framer-motion';

export default function ExperiencePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-16"
        >
          <span className="text-AAsecondary mr-2">02.</span> Experience
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h1>
        
        <div className="space-y-16">
          {/* Experience items would go here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-md border border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-200">Senior Software Engineer</h2>
              <div className="font-mono text-AAsecondary">2020 - Present</div>
            </div>
            <h3 className="text-xl text-gray-300 mb-4">Tech Company Inc.</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Led development of key product features resulting in 30% user growth</li>
              <li>Architected and implemented scalable backend services using Node.js and TypeScript</li>
              <li>Mentored junior developers and conducted code reviews to maintain code quality</li>
              <li>Collaborated with product and design teams to deliver exceptional user experiences</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 p-8 rounded-md border border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-200">Frontend Developer</h2>
              <div className="font-mono text-AAsecondary">2018 - 2020</div>
            </div>
            <h3 className="text-xl text-gray-300 mb-4">Digital Agency XYZ</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Developed responsive web applications using React and Next.js</li>
              <li>Implemented modern UI/UX designs with CSS animations and transitions</li>
              <li>Optimized application performance and loading times</li>
              <li>Worked in an agile team environment with daily standups and sprint planning</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}