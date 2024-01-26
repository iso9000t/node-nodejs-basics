import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from "node:path";
import { fileURLToPath } from 'node:url';

const remove = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const deleteFilePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await access(deleteFilePath, constants.F_OK);
  } catch (error) {
    throw new Error('FS operation failed');
  }
   
    await unlink(deleteFilePath);
};

await remove();
