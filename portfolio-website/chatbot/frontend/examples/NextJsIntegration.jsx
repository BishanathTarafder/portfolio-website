// Example of integrating the ChatbotWidget into a Next.js application

// pages/_app.js
import '../styles/globals.css';
import ChatbotWidget from '../chatbot/frontend/ChatbotWidget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatbotWidget initialMessage="Welcome to my portfolio! How can I help you today?" />
    </>
  );
}

export default MyApp;

// Alternative: Component-level integration
// pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

// Import the ChatbotWidget with no SSR to avoid hydration issues
const ChatbotWidget = dynamic(
  () => import('../chatbot/frontend/ChatbotWidget'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My professional portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Your portfolio content */}
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        
        {/* Other portfolio sections */}
      </main>

      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>

      {/* Add the ChatbotWidget */}
      <ChatbotWidget />
    </div>
  );
}