const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Test Server Running Successfully</h1>
        <p>This confirms that a basic HTTP server can run on your system.</p>
        <p>If you're seeing this page but can't access your Next.js application, the issue is likely specific to Next.js configuration.</p>
        <p>Current time: ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  `);
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log('==================================');
  console.log(`Test server running at http://localhost:${PORT}/`);
  console.log('If you see this message, the server is running');
  console.log('==================================');
});