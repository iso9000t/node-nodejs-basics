import { access, copyFile, mkdir, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourceDirPath = join(__dirname, 'files');
  const destinationDirPath = join(__dirname, 'files_copy');

  try {
    await access(sourceDirPath, constants.R_OK);
  } catch (error) {
    throw new Error('FS operation failed');
  }

  try {
    await access(destinationDirPath, constants.R_OK);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  await mkdir(destinationDirPath);
  const files = await readdir(sourceDirPath);
  for (const file of files) {
    const sourcePath = join(sourceDirPath, file);
    const destinationPath = join(destinationDirPath, file);
    await copyFile(sourcePath, destinationPath);
  }
};

await copy();
