import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();
  // to enable the try catch block (in cli/serve.ts) to work
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
