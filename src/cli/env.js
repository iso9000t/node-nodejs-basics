const parseEnv = () => {
  let result = '';
  for (const key in process.env) {
    if (process.env.hasOwnProperty(key) && key.startsWith('RSS_')) {
      result += `${key}=${process.env[key]};`;
    }
  }
  console.log(result);
};

parseEnv();
