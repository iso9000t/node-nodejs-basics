import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath);

  try {
    await pipeline(process.stdin, writeStream);
    console.log('Write stream complete.');
  } catch (error) {
    console.error('Error in write stream:', error);
  }
};

await write();
