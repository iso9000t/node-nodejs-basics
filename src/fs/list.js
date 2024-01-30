import { access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const directoryPath = join(__dirname, 'files');

    try {
        await access(directoryPath, constants.F_OK);
        const files = await readdir(directoryPath);
        console.log(files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
    
};

await list();
