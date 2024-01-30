import { pipeline } from 'stream';
import { Transform } from 'node:stream';

const transform = async () => {
  const reversedTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      this.push(reversedChunk);
      callback();
    },
  });

    pipeline(process.stdin, reversedTransform, process.stdout, (error) => {
        console.error('Error in pipeline:', error);
     })
};

await transform();
