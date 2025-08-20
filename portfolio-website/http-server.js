const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Starting HTTP server script...');
console.log('Current directory:', process.cwd());
console.log('Node.js version:', process.version);

// Create a basic HTML file directly
const indexPath = path.join(__dirname, 'index.html');
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
  <p>This is a temporary page created by the HTTP server.</p>
  <p>The Next.js server encountered issues, but this HTTP server is working correctly.</p>
  <p>Server time: ${new Date().toLocaleString()}</p>
</body>
</html>`;

// Write the HTML file synchronously before starting the server
try {
  fs.writeFileSync(indexPath, basicHtml);
  console.log('Created index.html successfully at:', indexPath);
} catch (error) {
  console.error('Error creating index.html:', error.message);
}

// Helper function to serve HTML files
function serveHtmlFile(filePath, res) {
  try {
    console.log('Reading file synchronously:', filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
    console.log('Successfully served index.html');
  } catch (err) {
    console.error('Error reading file:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error: ' + err.message);
  }
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`Received request for: ${req.url}`);
  
  // Serve index.html for root path
  if (req.url === '/' || req.url === '/index.html') {
    serveHtmlFile(indexPath, res);
  } else {
    // Handle 404 for other paths
    console.log('404 for path:', req.url);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
const PORT = 3000; // Try a different port
try {
  server.listen(PORT, () => {
    console.log('==================================');
    console.log(`HTTP server running at http://localhost:${PORT}/`);
    console.log('Server started successfully');
    console.log('==================================');
  });

  // Handle server errors
  server.on('error', (err) => {
    console.error('Server error:', err.message);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try a different port.`);
    }
  });
} catch (error) {
  console.error('Fatal error starting server:', error.message);
}