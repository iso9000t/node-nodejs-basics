import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const txtFilePath = join(__dirname, 'files', 'fileToCompress.txt');
  const gzFilePath = join(__dirname, 'files', 'archive.gz');

  const gzip = createGzip();
  const sourceStream = createReadStream(txtFilePath);
  const destinationStream = createWriteStream(gzFilePath);

  try {
    await pipeline(sourceStream, gzip, destinationStream);
    console.log(
      'File successfully compressed');
  } catch (error) {
    error.code === 'ENOENT'
      ? console.log('File not found')
      : console.log('Error in compressing file', error);
  }
};

await compress();
