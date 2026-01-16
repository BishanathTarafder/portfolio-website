import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Chatbot from '@/components/chatbot';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saidul Mursalin Khan | AI Engineer Portfolio',
  description: 'Portfolio website showcasing AI engineering projects, machine learning expertise, and software development skills',
  keywords: ['AI Engineer', 'Machine Learning', 'Software Development', 'Portfolio', 'Next.js', 'React'],
  authors: [{ name: 'Saidul Mursalin Khan' }],
  creator: 'Saidul Mursalin Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-website.com',
    title: 'Saidul Mursalin Khan | AI Engineer Portfolio',
    description: 'Portfolio website showcasing AI engineering projects, machine learning expertise, and software development skills',
    siteName: 'Saidul Mursalin Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saidul Mursalin Khan | AI Engineer Portfolio',
    description: 'Portfolio website showcasing AI engineering projects, machine learning expertise, and software development skills',
    creator: '@saidulkhan',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}