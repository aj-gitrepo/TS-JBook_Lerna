import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // naive solution to access the app - not good becaue each folder (cli, local-api, local-client)
  // is going to be a seperate package in npm
  app.use(express.static('../../local-client/build'));
  // can create a dependency in local-api to local-client

  // for development using app in port 3000, now if 4005 is opend the app opens
  // app.use(
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     ws: true,
  //     logLevel: 'silent',
  //   })
  // );

  // to enable the try catch block (in cli/serve.ts) to work
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
