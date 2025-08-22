import { Layout } from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

'use client';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:px-16 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center font-mono text-AAsecondary text-2xl mb-8"
        >
          <span className="text-AAsecondary mr-2">01.</span> About Me
          <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 text-gray-400"
          >
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p>
                Hello! I'm Saidul, a software engineer who enjoys creating things that live on the internet. 
                My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — 
                turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
              </p>
              
              <p>
                Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, 
                a huge corporation, and a student-led design studio. My main focus these days is building accessible, 
                inclusive products and digital experiences at Upstatement for a variety of clients.
              </p>
              
              <p>
                I also recently launched a course that covers everything you need to build a web app with the 
                Spotify API using Node & React.
              </p>

              <p>
                Here are a few technologies I've been working with recently:
              </p>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>JavaScript (ES6+)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>React</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>Node.js</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>TypeScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>Next.js</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-AAsecondary">▹</span>
                    <span>Tailwind CSS</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 flex justify-center"
          >
            <div className="relative group w-64 h-64">
              <div className="absolute inset-0 border-2 border-AAsecondary rounded translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-AAprimary/50 group-hover:bg-transparent transition-all duration-300 z-10"></div>
              <div className="relative w-64 h-64 bg-gray-700 rounded overflow-hidden">
                <Image 
                  src="/profile-image.jpg" 
                  alt="Saidul Mursalin Khan" 
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Education</h3>
                <ul className="space-y-4">
                  <li>
                    <div className="font-medium">M.S. in Computer Science</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Stanford University, 2018-2020</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Specialization in Artificial Intelligence</div>
                  </li>
                  <li>
                    <div className="font-medium">B.S. in Computer Engineering</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">MIT, 2014-2018</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Minor in Mathematics</div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Work Experience</h3>
                <ul className="space-y-4">
                  <li>
                    <div className="font-medium">Senior AI Engineer</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">TechInnovate AI, 2022-Present</div>
                  </li>
                  <li>
                    <div className="font-medium">Machine Learning Engineer</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">DataSmart Solutions, 2020-2022</div>
                  </li>
                  <li>
                    <div className="font-medium">AI Research Intern</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Google AI, Summer 2019</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="flex items-center font-mono text-AAsecondary text-2xl mb-8">
            <span className="text-AAsecondary mr-2">02.</span> Skills & Expertise
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-72"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Category 1 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">Machine Learning</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Supervised & Unsupervised Learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Deep Learning (CNN, RNN, Transformers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Model Optimization & Deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>TensorFlow, PyTorch, Scikit-learn</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 2 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">Data Engineering</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Data Processing & ETL Pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>SQL & NoSQL Databases</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Big Data Technologies (Spark, Hadoop)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Data Visualization (Matplotlib, Plotly)</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 3 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">Software Development</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Python, JavaScript/TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>RESTful APIs & Microservices</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>CI/CD & DevOps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Cloud Platforms (AWS, GCP, Azure)</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 4 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">Natural Language Processing</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Text Classification & Sentiment Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Named Entity Recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Machine Translation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Large Language Models (BERT, GPT)</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 5 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">Computer Vision</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Image Classification & Segmentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Object Detection & Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Face Recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>OpenCV, TensorFlow Vision</span>
                </li>
              </ul>
            </div>

            {/* Skill Category 6 */}
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-md hover:border-AAsecondary/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-200">MLOps & Deployment</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Model Versioning & Experiment Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Containerization (Docker, Kubernetes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Model Serving & API Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-AAsecondary">▹</span>
                  <span>Monitoring & Performance Optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="flex items-center justify-center font-mono text-AAsecondary text-2xl mb-6">
            <span className="text-AAsecondary mr-2">03.</span> Let's Work Together
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
            I'm currently available for freelance projects, full-time positions, and consulting work.
          </p>
          <Link 
            href="/contact" 
            className="border border-AAsecondary text-AAsecondary px-7 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}