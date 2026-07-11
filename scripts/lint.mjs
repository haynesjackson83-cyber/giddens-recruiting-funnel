import { readFileSync } from 'node:fs';

const files = ['index.html', 'src/hero.js', 'src/styles.css'];
let failed = false;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  if (text.includes('\t')) {
    console.error(`${file}: tabs are not allowed`);
    failed = true;
  }
  if (!text.endsWith('\n')) {
    console.error(`${file}: missing trailing newline`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Lint checks passed.');
