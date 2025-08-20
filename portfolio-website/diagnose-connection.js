const http = require('http');
const { exec } = require('child_process');

// Check if a port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use`);
        resolve(true);
      } else {
        console.log(`Error checking port ${port}: ${err.message}`);
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      server.close();
      console.log(`Port ${port} is available`);
      resolve(false);
    });
    
    server.listen(port);
  });
}

// Check network connectivity
function checkNetworkConnectivity() {
  console.log('Checking network connectivity...');
  exec('ping -n 1 localhost', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error pinging localhost: ${error.message}`);
      return;
    }
    console.log('Ping localhost result:');
    console.log(stdout);
  });
}

// Check if Next.js server is running
function checkNextJsProcess() {
  console.log('Checking for Next.js processes...');
  exec('tasklist | findstr node', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking processes: ${error.message}`);
      return;
    }
    if (stdout) {
      console.log('Node processes found:');
      console.log(stdout);
    } else {
      console.log('No Node.js processes found running');
    }
  });
}

// Run diagnostics
async function runDiagnostics() {
  console.log('=== Connection Diagnostics ===');
  
  // Check ports
  const port3000InUse = await checkPort(3000);
  const port3001InUse = await checkPort(3001);
  
  // Check network
  checkNetworkConnectivity();
  
  // Check processes
  checkNextJsProcess();
  
  console.log('\n=== Diagnostic Summary ===');
  console.log(`Port 3000 in use: ${port3000InUse}`);
  console.log(`Port 3001 in use: ${port3001InUse}`);
  console.log('Check above for network and process details');
}

runDiagnostics();