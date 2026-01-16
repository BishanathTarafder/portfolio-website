const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

console.log('Starting Express server setup...');
console.log('Current directory:', process.cwd());

try {
  // Create Express app
  const app = express();
  const PORT = 8000;

  // Serve static files from the current directory
  app.use(express.static(path.join(__dirname)));
  console.log('Static file middleware configured for:', path.join(__dirname));

  // Check if index.html exists before starting server
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('index.html found at:', indexPath);
  } else {
    console.error('WARNING: index.html not found at:', indexPath);
    // Create a basic index.html if it doesn't exist
    const basicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #0070f3;
    }
    p {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Welcome to My Portfolio</h1>
  <p>This is a temporary page created by the Express server.</p>
  <p>The Next.js server encountered issues, but this Express server is working correctly.</p>
</body>
</html>`;
    
    fs.writeFileSync(indexPath, basicHtml);
    console.log('Created a basic index.html file');
  }

  // Route for the home page with detailed logging
  app.get('/', (req, res) => {
    console.log('Received request for homepage');
    const filePath = path.join(__dirname, 'index.html');
    
    try {
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        console.log('Serving index.html from:', filePath);
        res.sendFile(filePath);
      } else {
        console.error('index.html not found at time of request');
        res.status(404).send('File not found - index.html is missing');
      }
    } catch (error) {
      console.error('Error serving index.html:', error.message);
      res.status(500).send('Server error: ' + error.message);
    }
  });

  // Create HTTP server with error handling
  const server = http.createServer(app);
  
  server.on('error', (error) => {
    console.error('Server error:', error.message);
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try a different port.`);
    }
  });

  // Start the server
  server.listen(PORT, () => {
    console.log('==================================');
    console.log(`Express server running at http://localhost:${PORT}/`);
    console.log('Server started successfully');
    console.log('==================================');
  });
} catch (error) {
  console.error('Fatal error starting Express server:', error);
}