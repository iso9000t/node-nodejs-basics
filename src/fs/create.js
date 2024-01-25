import { writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { constants } from "node:fs";

const create = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fresh.txt')
    try {
        await access(filePath, constants.F_OK);
        throw new Error("FS operation failed");
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(filePath, 'I am fresh and young');
        } else {
            throw error;
        }
    }
};

await create();
