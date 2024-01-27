import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  const readStream = createReadStream(filePath);

  try {
    await pipeline(readStream, process.stdout);
    console.log('Read stream complete.');
  } catch (error) {
    console.error('Error in read stream:', error);
  }
};

await read();
