// Keep palette browser checks bounded even if Vite or Chromium hangs.
// On POSIX, Playwright and its server/browser descendants run in a new group.
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const child = spawn(process.execPath, [require.resolve('@playwright/test/cli'), 'test', 'e2e/palette-migration.spec.ts', ...process.argv.slice(2)], {
  stdio: 'inherit', detached: process.platform !== 'win32',
});
let timedOut = false;
function terminate() {
  if (!child.pid) return;
  try {
    if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
    else process.kill(-child.pid, 'SIGKILL');
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}
const timer = setTimeout(() => {
  timedOut = true;
  console.error('Palette browser tests exceeded the external 75-second limit.');
  terminate();
}, 75_000);
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { clearTimeout(timer); terminate(); process.exit(signal === 'SIGINT' ? 130 : 143); });
child.on('error', error => { clearTimeout(timer); console.error(error); process.exitCode = 1; });
child.on('exit', (code, signal) => {
  clearTimeout(timer);
  terminate(); // Also clean up any remaining descendants after an early exit.
  process.exitCode = timedOut ? 124 : (code ?? (signal ? 1 : 0));
});
