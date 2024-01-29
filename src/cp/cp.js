import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { fork } from 'node:child_process';

const spawnChildProcess = async (args) => {
   const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'script.js');

    const childProcess = fork(filePath, args, {silent: true});
    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
