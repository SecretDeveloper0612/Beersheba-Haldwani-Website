const { spawn } = require('child_process');
const path = require('path');

function startProcess(name, dir, command, args, env = {}) {
  console.log(`Starting ${name} in production mode...`);
  const proc = spawn(command, args, {
    cwd: path.join(__dirname, dir),
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, ...env }
  });

  proc.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });

  return proc;
}

// Start School Website on port 3000 (production)
const website = startProcess(
  'School Website',
  'school-website',
  'npm',
  ['start'],
  { PORT: '3000' }
);

// Start Admin Portal on port 3001 (production)
const admin = startProcess(
  'Admin Portal',
  'admin-portal',
  'npm',
  ['start'],
  { PORT: '3001' }
);

// Handle termination signals
process.on('SIGINT', () => {
  website.kill();
  admin.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  website.kill();
  admin.kill();
  process.exit();
});
