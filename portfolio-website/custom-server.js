// Custom Next.js server implementation
const { createServer } = require('http');
const { parse } = require('url');

console.log('Starting custom Next.js server...');
console.log('Current directory:', process.cwd());

try {
  console.log('Attempting to require next...');
  const next = require('next');
  console.log('Successfully required next');
  
  // Initialize Next.js
  const dev = process.env.NODE_ENV !== 'production';
  console.log('Development mode:', dev);
  
  console.log('Initializing Next.js app...');
  const app = next({ dev });
  console.log('Next.js app initialized');
  
  const handle = app.getRequestHandler();
  console.log('Request handler obtained');

// Define port
const PORT = 8080;

// Prepare and start server
console.log('Preparing Next.js app...');
app.prepare()
  .then(() => {
    console.log('Next.js app prepared successfully');
    
    console.log('Creating HTTP server...');
    createServer((req, res) => {
      // Parse request URL
      const parsedUrl = parse(req.url, true);
      console.log(`Received request: ${req.method} ${parsedUrl.pathname}`);
      
      // Let Next.js handle the request
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err);
        throw err;
      }
      console.log('==================================');
      console.log(`> Ready on http://localhost:${PORT}`);
      console.log('> If you see this message, the Next.js server is running');
      console.log('> This custom server implementation bypasses the Node.js installation directory detection');
      console.log('==================================');
    });
  })
  .catch((ex) => {
    console.error('Error during Next.js preparation:');
    console.error(ex.stack);
    process.exit(1);
  });
} catch (error) {
  console.error('Error initializing Next.js:');
  console.error(error);
  process.exit(1);
}