import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerPath = join(__dirname, 'worker.js');
  const numberOfCores = cpus().length;
  let workerPromises = [];

  for (let i = 0; i < numberOfCores; i++) {
    let promise = new Promise((resolve, reject) => {
      let worker = new Worker(workerPath, { workerData: 10 + i });
      worker.on('message', (result) =>
        resolve({ status: 'resolved', data: result })
      );
      worker.on('error', (error) => reject({ status: 'error', data: null }));
    });
    workerPromises.push(promise);
  }

  const data = await Promise.all(workerPromises);
  console.log(data);
};

await performCalculations();
