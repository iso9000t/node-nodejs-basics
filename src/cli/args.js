const parseArgs = () => {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (i % 2 === 0) {
      const name = args[i].replace('--', '');
      const value = args[i + 1];
      console.log(`${name} is ${value}`);
    }
  }
};

parseArgs();
