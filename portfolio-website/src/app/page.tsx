import Link from 'next/link';
import { Layout } from '@/components/layout';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Client component wrapper for animations
'use client';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-32">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-AAsecondary font-mono mb-4"
          >
            Hi, my name is
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-200 mb-4"
          >
            Saidul Mursalin Khan.
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-400 mb-8"
          >
            I build things for the web.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 max-w-xl mb-12 text-lg"
          >
            I'm a software engineer specializing in building exceptional digital experiences. 
            Currently, I'm focused on building accessible, human-centered products 
            in the javascript ecosystem and full stack applications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              href="/projects" 
              className="border border-AAsecondary text-AAsecondary px-7 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono"
            >
              Check out my projects!
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="card">
              <div className="p-6">
                <div className="text-sm font-medium text-accent-600 mb-2">Machine Learning</div>
                <h3 className="text-xl font-bold mb-2">Predictive Analytics Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A dashboard for visualizing ML predictions with interactive charts and real-time data processing.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">TensorFlow</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">React</span>
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Project
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-sm font-medium">
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="card">
              <div className="p-6">
                <div className="text-sm font-medium text-accent-600 mb-2">Natural Language Processing</div>
                <h3 className="text-xl font-bold mb-2">Sentiment Analysis API</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  An API that analyzes text sentiment using transformer models with high accuracy and low latency.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">PyTorch</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">FastAPI</span>
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Project
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-sm font-medium">
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="card">
              <div className="p-6">
                <div className="text-sm font-medium text-accent-600 mb-2">Computer Vision</div>
                <h3 className="text-xl font-bold mb-2">Object Detection System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Real-time object detection system optimized for edge devices with custom model architecture.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Python</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">OpenCV</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">TensorRT</span>
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Project
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-sm font-medium">
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Category 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Machine Learning</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Supervised & Unsupervised Learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Deep Learning (CNN, RNN, Transformers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Model Optimization & Deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>TensorFlow, PyTorch, Scikit-learn</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Data Engineering</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Data Processing & ETL Pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>SQL & NoSQL Databases</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Big Data Technologies (Spark, Hadoop)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Data Visualization (Matplotlib, Plotly)</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Software Development</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Python, JavaScript/TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>RESTful APIs & Microservices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>CI/CD & DevOps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  <span>Cloud Platforms (AWS, GCP, Azure)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in working together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance projects, full-time positions, and consulting work.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
}