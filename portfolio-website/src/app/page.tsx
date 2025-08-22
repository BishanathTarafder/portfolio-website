'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Hero } from '@/components/hero';
import { FeaturedProjects } from '@/components/featured-projects';
import { Skills } from '@/components/skills';
import { ContactCTA } from '@/components/contact-cta';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <ContactCTA />
    </Layout>
  );
}