const { spawn } = require('child_process');
const path = require('path');

function startProcess(name, dir, command, args) {
  console.log(`Starting ${name}...`);
  const process = spawn(command, args, {
    cwd: path.join(__dirname, dir),
    shell: true,
    stdio: 'inherit'
  });

  process.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });

  return process;
}

// Start School Website on default port (usually 3000)
const website = startProcess('School Website', 'school-website', 'npm', ['run', 'dev']);

// Start Admin Portal on Port 3001
// We set PORT=3001 to avoid conflict with the website
process.env.PORT = '3001';
const admin = startProcess('Admin Portal', 'admin-portal', 'npm', ['run', 'dev', '--', '-p', '3001']);

// Handle termination signals
process.on('SIGINT', () => {
  website.kill();
  admin.kill();
  process.exit();
});
