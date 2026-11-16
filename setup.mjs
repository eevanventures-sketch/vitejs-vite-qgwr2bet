import fs from 'node:fs';
import path from 'node:path';

const raw = fs.readFileSync('b.txt', 'utf8').replace(/\r\n/g, '\n');
const parts = raw.split(/^\s*===F:\s*(.+?)\s*===\s*$/gm);
for (let i = 1; i < parts.length; i += 2) {
  const filePath = parts[i].trim();
    const content = parts[i + 1].replace(/^\n/, '');
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content, 'utf8');
          console.log('OK:', filePath);
          }