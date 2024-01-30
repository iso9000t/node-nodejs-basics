import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream';

const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hashStream = createHash('sha256');
  const inputStream = createReadStream(filePath);

  pipeline(inputStream, hashStream, (error) => {
    if (error) {
      error.code === 'ENOENT'
        ? console.error('There is no file to calculate hash')
        : console.error('Hash calculation failed:', error);
    } else {
      console.log(hashStream.digest('hex'));
    }
  });
};

await calculateHash();
