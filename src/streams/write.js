import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream/promises';

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath);

  try {
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    console.error('Error in writing stream:', error);
  }
};

await write();
