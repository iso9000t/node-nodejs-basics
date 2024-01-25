import { access, rename as fsRename } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = join(__dirname, 'files', 'properFilename.md');

  try {
    await access(oldPath, constants.F_OK);
  } catch (error) {
    throw new Error('FS operation failed');
  }

  try {
    await access(newPath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  await fsRename(oldPath, newPath);
};

await rename();
