'use client';

import Layout from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GithubIcon } from '@/components/icons';

export default function WorkPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-16"
        >
          <span className="text-AAsecondary mr-2">03.</span> My Work
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h1>
        
        <div className="space-y-32">
          {/* Project 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-md w-full">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 relative">
                <Image
                  src="/project-analytics.jpg"
                  alt="Predictive Analytics Dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Predictive Analytics Dashboard</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      A comprehensive analytics dashboard with predictive capabilities, data visualization, and real-time monitoring features.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300">
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>D3.js</span>
                    <span>Node.js</span>
                  </div>
                  <div className="flex gap-5">
                    <Link href="#" aria-label="GitHub Repository" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
                      <GithubIcon />
                    </Link>
                    <Link href="/projects/analytics-dashboard" aria-label="View Project" className="text-gray-300 hover:text-AAsecondary transition-all duration-300">
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
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group flex justify-end"
          >
            <div className="relative overflow-hidden rounded-md w-full">
              <div className="absolute inset-0 bg-AAprimary/80 group-hover:bg-AAprimary/50 transition-all duration-300 z-10"></div>
              <div className="h-80 bg-gray-700 relative">
                <Image
                  src="/project-nlp.jpg"
                  alt="Sentiment Analysis API"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-20 text-right">
                <div>
                  <div className="font-mono text-AAsecondary text-sm mb-2">Featured Project</div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-4 group-hover:text-AAsecondary transition-all duration-300">Sentiment Analysis API</h3>
                  <div className="bg-gray-800/90 p-6 rounded-md shadow-xl mb-4 text-gray-400">
                    <p>
                      A natural language processing API that analyzes text sentiment, extracts key entities, and provides language insights.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-sm text-gray-300 justify-end">
                    <span>Python</span>
                    <span>Flask</span>
                    <span>NLTK</span>
                    <span>Docker</span>
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
        </div>
      </div>
    </Layout>
  );
}