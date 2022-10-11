import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let initialized: boolean = false;

const bundler = async (rawCode: string) => {
  if(!initialized) { //to run only at start
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm' //instead of pasting the wasm in public folder
    });
    initialized = true;
  }

  // using try catch block to get err when invalid code form is typed
  try{
    const res = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(), //onResolve
        fetchPlugin(rawCode) //onLoad
      ],
      // to prevent warnings while bundling
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement', //to avoid naming collisions with user's react import
      jsxFragment: '_React.Fragment',
    });
  
    return {
      code: res.outputFiles[0].text,
      err: ''
    };
  } catch (err: any) {
    console.log(err);
    return {
      code: '',
      err: err.message
    };
  }
}

export default bundler;

// to have multiple code editors at the same time