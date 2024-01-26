import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import './files/c.js';
import { fileURLToPath } from 'node:url';

const random = Math.random();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let unknownObject;

if (random > 0.5) {
  const data = await readFile(path.join(__dirname, 'files', 'a.json'), 'utf-8');
  unknownObject = JSON.parse(data);
} else {
  const data = await readFile(path.join(__dirname, 'files', 'b.json'), 'utf8');
  unknownObject = JSON.parse(data);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
