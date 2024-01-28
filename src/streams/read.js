import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream/promises';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  const readStream = createReadStream(filePath);

  try {
    await pipeline(readStream, process.stdout);
  } catch (error) {
    console.error('Error in read stream:', error);
  }
};

await read();
