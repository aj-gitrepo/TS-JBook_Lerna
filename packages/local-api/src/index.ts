import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

import { createCellsRouter } from './routes/cells';

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();

  // if this doesn't work then go to proxy middleware
  app.use(createCellsRouter(filename, dir)); //to fetchCells

  // for development using app in port 3000, now if 4005 is opend the app opens
  // Now, whenever a request comes in, we're going to first try to match it inside that router and if it doesn't match, then we'll follow through to our middleware.
  if(useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // for production - to serve the react app
    const packagePath = require.resolve('local-client/build/index.html'); //helps to get to th file using algorithm
    app.use(express.static(path.dirname(packagePath))); //path uptill /build
  }

  // to enable the try catch block (in cli/serve.ts) to work
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};


// naive solution to access the app - not good becaue each folder (cli, local-api, local-client)
// is going to be a seperate package in npm
  // app.use(express.static('../../local-client/build'));
// can create a dependency in local-api to local-client

