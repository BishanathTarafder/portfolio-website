'use client';
import Layout from '@/components/layout';
import { Hero } from '@/components/hero';
import { FeaturedProjects } from '@/components/featured-projects';
import { Skills } from '@/components/skills';
import { ContactCTA } from '@/components/contact-cta';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Import content from other pages
import { GithubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '@/components/icons';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center font-mono text-AAsecondary text-2xl mb-8"
          >
            <span className="text-AAsecondary mr-2">01.</span> About Me
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 text-gray-400"
            >
              <div className="prose dark:prose-invert max-w-none mb-8">
                <p>
                  Hello! I&apos;m Saidul, a software engineer who enjoys creating things that live on the internet. 
                  My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — 
                  turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
                </p>
                
                <p>
                  Fast-forward to today, and I&apos;ve had the privilege of working at an advertising agency, a start-up, 
                  a huge corporation, and a student-led design studio. My main focus these days is building accessible, 
                  inclusive products and digital experiences at Upstatement for a variety of clients.
                </p>
                
                <p>
                  I also recently launched a course that covers everything you need to build a web app with the 
                  Spotify API using Node & React.
                </p>

                <p>
                  Here are a few technologies I&apos;ve been working with recently:
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
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center font-mono text-AAsecondary text-2xl mb-12"
          >
            <span className="text-AAsecondary mr-2">02.</span> Experience
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gray-800/50 rounded-md border border-gray-700 p-8 mb-12">
              <div className="mb-8">
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Work Experience</h3>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">Senior AI Engineer</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">TechCorp Inc.</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2021 - Present</span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                      <li>Led the development of computer vision algorithms for autonomous systems</li>
                      <li>Designed and implemented deep learning models for real-time object detection</li>
                      <li>Optimized ML pipelines for production environments, reducing inference time by 40%</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">Machine Learning Engineer</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">AI Solutions Ltd</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2019 - 2021</span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                      <li>Developed NLP models for sentiment analysis and text classification</li>
                      <li>Built recommendation systems using collaborative filtering techniques</li>
                      <li>Collaborated with cross-functional teams to integrate ML solutions into production systems</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Education</h3>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">M.S. in Computer Science</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">Stanford University</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2018 - 2020</span>
                      </div>
                    </div>
                    <p className="text-gray-400">Specialization in Artificial Intelligence • GPA: 3.9/4.0</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">B.S. in Computer Engineering</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">MIT</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2014 - 2018</span>
                      </div>
                    </div>
                    <p className="text-gray-400">Minor in Mathematics • Magna Cum Laude • GPA: 3.8/4.0</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center font-mono text-AAsecondary text-2xl mb-12"
          >
            <span className="text-AAsecondary mr-2">03.</span> Some Things I&apos;ve Built
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </motion.h2>
          
          <FeaturedProjects />
        </div>
      </section>
      
      {/* Skills Section */}
      <Skills />
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center font-mono text-AAsecondary text-2xl mb-12 justify-center"
          >
            <span className="text-AAsecondary mr-2">04.</span> Get In Touch
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <p className="text-gray-400 mb-8">
              I&apos;m currently looking for new opportunities. Whether you have a question, project proposal, or just want to say hi, 
              my inbox is always open. I&apos;ll do my best to get back to you as soon as possible!
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="mailto:saidulmursalinkhan@gmail.com" 
                className="border border-AAsecondary text-AAsecondary px-8 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono text-lg"
              >
                Say Hello
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center space-x-8 mt-12"
          >
            <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <GithubIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <LinkedInIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <TwitterIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <InstagramIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}