'use client';

import { Layout } from '@/components/layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ResumePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-16"
        >
          <span className="text-AAsecondary mr-2">03.</span> Resume
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.div>
        
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-200"
          >
            My Experience
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              href="/resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="border border-AAsecondary text-AAsecondary px-5 py-3 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Resume
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800/50 rounded-md border border-gray-700 p-8 mb-12">

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-200">Saidul Mursalin Khan</h2>
            <p className="text-xl text-AAsecondary mb-4 font-mono">AI Engineer & ML Specialist</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>saidulmursalinkhan@gmail.com</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>github.com/saidulmursalin</span>
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>linkedin.com/in/saidulmursalin</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Summary</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Experienced AI Engineer and Machine Learning Specialist with 5+ years of experience designing and implementing intelligent systems. Proficient in machine learning, deep learning, natural language processing, and computer vision. Strong track record of delivering scalable AI solutions that drive business value across various industries.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Experience</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">Senior AI Engineer</h4>
                  <p className="text-gray-600 dark:text-gray-300">TechInnovate AI</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Jan 2022 - Present</div>
              </div>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Led the development of a real-time recommendation engine that increased user engagement by 35%</li>
                <li>Designed and implemented a computer vision system for quality control in manufacturing, reducing defects by 28%</li>
                <li>Mentored junior engineers and conducted knowledge-sharing sessions on advanced ML techniques</li>
                <li>Collaborated with product teams to define AI roadmap and prioritize features based on business impact</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">Machine Learning Engineer</h4>
                  <p className="text-gray-600 dark:text-gray-300">DataSmart Solutions</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Jun 2020 - Dec 2021</div>
              </div>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Developed NLP models for sentiment analysis and entity extraction with 92% accuracy</li>
                <li>Built and deployed ML pipelines using TensorFlow and Kubernetes for scalable model training</li>
                <li>Optimized model inference time by 40% through quantization and hardware acceleration</li>
                <li>Implemented A/B testing framework for evaluating model performance in production</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">AI Research Intern</h4>
                  <p className="text-gray-600 dark:text-gray-300">Google AI</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Summer 2019</div>
              </div>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Researched novel approaches for few-shot learning in image classification tasks</li>
                <li>Implemented and evaluated prototype models using PyTorch</li>
                <li>Co-authored a research paper presented at a major AI conference</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Education</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold">M.S. in Computer Science</h4>
                  <p className="text-gray-600 dark:text-gray-300">Stanford University</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">2018 - 2020</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Specialization in Artificial Intelligence</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold">B.S. in Computer Engineering</h4>
                  <p className="text-gray-600 dark:text-gray-300">MIT</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">2014 - 2018</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Minor in Mathematics</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Technical Skills</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Machine Learning & Deep Learning</li>
                  <li>Natural Language Processing</li>
                  <li>Computer Vision</li>
                  <li>Data Engineering & Big Data</li>
                  <li>MLOps & Model Deployment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Tools & Technologies</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Python, JavaScript/TypeScript</li>
                  <li>TensorFlow, PyTorch, Scikit-learn</li>
                  <li>SQL, NoSQL, Spark</li>
                  <li>Docker, Kubernetes</li>
                  <li>AWS, GCP, Azure</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Publications & Projects</h3>
            
            <div className="mb-4">
              <h4 className="font-bold">Few-Shot Learning for Image Classification Using Prototypical Networks</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">International Conference on Machine Learning (ICML), 2020</p>
              <p className="text-gray-600 dark:text-gray-300">Co-authored research paper on novel approaches to few-shot learning in image classification tasks.</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold">Open-Source NLP Library for Low-Resource Languages</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">github.com/johndoe/nlp-lowresource</p>
              <p className="text-gray-600 dark:text-gray-300">Developed and maintained an open-source library for NLP tasks in languages with limited resources.</p>
            </div>
            
            <div>
              <h4 className="font-bold">Real-Time Object Detection on Edge Devices</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">github.com/johndoe/edge-detection</p>
              <p className="text-gray-600 dark:text-gray-300">Created an optimized object detection system for deployment on resource-constrained edge devices.</p>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-200">Interested in working together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
            I'm currently available for freelance projects, full-time positions, and consulting work.
          </p>
          <Link 
            href="/contact" 
            className="border border-AAsecondary text-AAsecondary px-8 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}