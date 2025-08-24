'use client';

import { ProjectCard } from './project-card';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, ExternalLinkIcon } from './icons';

const featuredProjects = [
  {
    title: 'Predictive Analytics Dashboard',
    description: 'A dashboard for visualizing ML predictions with interactive charts and real-time data processing. Built with React, D3.js, and a Python backend using Flask and TensorFlow.',
    category: 'Machine Learning',
    tags: ['Python', 'TensorFlow', 'React', 'D3.js', 'Flask'],
    projectLink: 'https://example.com/project1',
    githubLink: 'https://github.com/username/project1',
    imageSrc: '/project-analytics.jpg',
    imageAlt: 'Predictive Analytics Dashboard'
  },
  {
    title: 'NLP Research Platform',
    description: 'A platform for natural language processing research with tools for text analysis and sentiment detection. Implements BERT and GPT models for advanced language understanding.',
    category: 'Natural Language Processing',
    tags: ['Python', 'NLTK', 'React', 'Node.js', 'BERT', 'Transformers'],
    projectLink: 'https://example.com/project2',
    githubLink: 'https://github.com/username/project2',
    imageSrc: '/project-nlp.jpg',
    imageAlt: 'NLP Research Platform'
  },
  {
    title: 'Computer Vision System',
    description: 'An advanced computer vision system for object detection and image classification using deep learning. Deployed on edge devices for real-time processing and analysis.',
    category: 'Computer Vision',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch', 'YOLO'],
    projectLink: 'https://example.com/project3',
    githubLink: 'https://github.com/username/project3',
    imageSrc: '/project-vision.jpg',
    imageAlt: 'Computer Vision System'
  }
];

export function FeaturedProjects() {
  return (
    <div className="w-full projects" id="projects">
      <div className="section-title mb-12">
        <h2 className="text-3xl font-bold mb-4 opacity-0">Featured Projects</h2>
        <p className="text-gray-400 opacity-0">Some of my recent work</p>
      </div>
      <div className="grid grid-cols-1 gap-24">
        {featuredProjects.map((project, index) => (
          <div 
            key={index}
            className={`project-card opacity-0 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center ${index % 2 === 0 ? '' : 'md:text-right'}`}
          >
            {/* Project Image (Left for even, Right for odd) */}
            <div className={`md:col-span-7 relative ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <div className="relative group">
                <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden rounded">
                  <div className="absolute inset-0 bg-AAsecondary/20 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                  <Image 
                    src={project.imageSrc} 
                    alt={project.imageAlt}
                    width={800}
                    height={450}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Project Info (Right for even, Left for odd) */}
            <div className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <div className={`flex flex-col ${index % 2 === 0 ? '' : 'md:items-end'}`}>
                <p className="font-mono text-AAsecondary mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">{project.title}</h3>
                
                <div className="bg-gray-800/80 p-6 rounded shadow-xl mb-4 backdrop-blur-sm">
                  <p className="text-gray-400">{project.description}</p>
                </div>
                
                <ul className={`flex flex-wrap gap-3 mb-6 text-sm font-mono text-gray-400 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                  {project.tags.map((tag, tagIndex) => (
                    <li key={tagIndex}>{tag}</li>
                  ))}
                </ul>
                
                <div className="flex gap-5">
                  <Link href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-AAsecondary transition-colors duration-200">
                    <GithubIcon className="w-6 h-6" />
                  </Link>
                  <Link href={project.projectLink} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-AAsecondary transition-colors duration-200">
                    <ExternalLinkIcon className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center project-card opacity-0">
        <Link 
          href="#projects" 
          className="border border-AAsecondary text-AAsecondary px-6 py-3 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono text-sm"
        >
          View More Projects
        </Link>
      </div>
    </div>
  );
}