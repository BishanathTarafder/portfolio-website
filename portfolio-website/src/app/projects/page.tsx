import Link from 'next/link';
import { Layout } from '@/components/layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GithubIcon } from '@/components/icons';

'use client';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Machine Learning', 'NLP', 'Computer Vision', 'Web Development'];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-12"
        >
          <span className="text-AAsecondary mr-2">03.</span> Some Things I've Built
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 mb-8">
            {filters.map((filter, index) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded border font-mono text-sm transition-all duration-300 ${activeFilter === filter 
                  ? 'border-AAsecondary text-AAsecondary bg-AAsecondary bg-opacity-10' 
                  : 'border-gray-600 text-gray-400 hover:border-AAsecondary hover:text-AAsecondary'}`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Predictive Analytics Dashboard</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      A dashboard for visualizing ML predictions with interactive charts and real-time data processing.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300">
                    <span>Python</span>
                    <span>TensorFlow</span>
                    <span>React</span>
                  </div>
                  <div className="flex gap-5">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon />
                    </Link>
                    <Link href="/projects/predictive-analytics" aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative group flex justify-end"
          >
            <div className="relative overflow-hidden rounded-md w-full">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20 text-right">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Sentiment Analysis API</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      An API that analyzes text sentiment using transformer models with high accuracy and low latency.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300 justify-end">
                    <span>Python</span>
                    <span>PyTorch</span>
                    <span>FastAPI</span>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon />
                    </Link>
                    <Link href="/projects/sentiment-analysis" aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Object Detection System</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      Real-time object detection system optimized for edge devices with custom model architecture.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300">
                    <span>Python</span>
                    <span>OpenCV</span>
                    <span>TensorRT</span>
                  </div>
                  <div className="flex gap-5">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon />
                    </Link>
                    <Link href="/projects/object-detection" aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative group flex justify-end"
          >
            <div className="relative overflow-hidden rounded-md w-full">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20 text-right">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Recommendation Engine</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      A scalable recommendation system using collaborative filtering and content-based approaches.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300 justify-end">
                    <span>Python</span>
                    <span>Spark</span>
                    <span>AWS</span>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon />
                    </Link>
                    <Link href="/projects/recommendation-engine" aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 5 - Other Projects Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="md:col-span-2 mt-16"
          >
            <h2 className="flex items-center justify-center font-mono text-AAsecondary text-xl mb-10">
              <span>Other Noteworthy Projects</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Other Project 1 */}
              <div className="bg-gray-800/50 rounded-md p-6 h-72 flex flex-col hover:translate-y-[-10px] transition-all duration-300 border border-gray-700 hover:border-AAsecondary/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-AAsecondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-4">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                    <Link href="/projects/ai-content-platform" aria-label="View Project" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-AAsecondary transition-all duration-300">AI-Powered Content Platform</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  A content management platform with AI-powered content generation, optimization, and analytics.
                </p>
                
                <div className="flex flex-wrap gap-3 font-mono text-xs text-gray-400">
                  <span>Next.js</span>
                  <span>Node.js</span>
                  <span>OpenAI</span>
                </div>
              </div>

              {/* Other Project 2 */}
              <div className="bg-gray-800/50 rounded-md p-6 h-72 flex flex-col hover:translate-y-[-10px] transition-all duration-300 border border-gray-700 hover:border-AAsecondary/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-AAsecondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-4">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                    <Link href="/projects/translation-system" aria-label="View Project" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-AAsecondary transition-all duration-300">Multilingual Translation System</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  A neural machine translation system supporting 50+ languages with domain-specific fine-tuning.
                </p>
                
                <div className="flex flex-wrap gap-3 font-mono text-xs text-gray-400">
                  <span>Python</span>
                  <span>Hugging Face</span>
                  <span>Docker</span>
                </div>
              </div>
              
              {/* Other Project 3 */}
              <div className="bg-gray-800/50 rounded-md p-6 h-72 flex flex-col hover:translate-y-[-10px] transition-all duration-300 border border-gray-700 hover:border-AAsecondary/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-AAsecondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-4">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                    <Link href="#" aria-label="View Project" className="text-gray-400 hover:text-AAsecondary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-AAsecondary transition-all duration-300">Portfolio Website</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  A modern portfolio website built with Next.js and Tailwind CSS featuring animations and responsive design.
                </p>
                
                <div className="flex flex-wrap gap-3 font-mono text-xs text-gray-400">
                  <span>Next.js</span>
                  <span>Tailwind CSS</span>
                  <span>Framer Motion</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <Link 
                href="#" 
                className="border border-AAsecondary text-AAsecondary px-7 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono"
              >
                View More Projects
              </Link>
            </div>
        </div>
      </div>
    </Layout>
  );
}