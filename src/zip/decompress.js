import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'fs';

const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const gzFilePath = join(__dirname, 'files', 'archive.gz');
  const txtFilePath = join(__dirname, 'files', 'fileToCompress.txt');

  const gunzip = createGunzip();
  const sourceStream = createReadStream(gzFilePath);
  const destinationStream = createWriteStream(txtFilePath);

  try {
    await pipeline(sourceStream, gunzip, destinationStream);
    console.log('File successfully decompressed');
  } catch (error) {
    error.code === 'ENOENT'
      ? console.log('File not found')
      : console.log('Error in decompressing file', error);
  }
};

await decompress();
