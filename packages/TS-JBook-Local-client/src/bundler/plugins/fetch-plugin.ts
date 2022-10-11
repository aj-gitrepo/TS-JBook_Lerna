import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache', //name of the database, can be viewed in storage tab of the browser console
});

// after onResolve moving to onLoad
export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode, //text from text area
        };
      });

      build.onLoad({ filter: /.*/ }, async(args: any) => { //runs each time
          // Check to see if we already have fetched this file - if it is in cache
          // if it is, return immediately
          const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path); //args.path is key
          if (cacheResult) {
            return cacheResult;
          }
      });

      // handling .css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data //to get the css file
          .replace(/\n/g, '') //replacing \n with ''
          .replace(/"/g, '\\"') //replacing " with \"
          .replace(/'/g, "\\'"); //replacing ' with \'
        //sending css to head tag of an html document
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          // path for next action
          resolveDir: new URL('./', request.responseURL).pathname, //without https://unpkg.com
        }

        // store response in cache, if not already there - with args.path as key and the result as value
        await fileCache.setItem(args.path, result);

        return result;
      });

      // handling any kind of js file
      build.onLoad({ filter: /.*/, namespace: 'a' }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          // path for next action
          resolveDir: new URL('./', request.responseURL).pathname, //without https://unpkg.com
        }

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
}

// a drawback of importing css files
// esbuild will load the import links in css file like images fonts etc so loader for each of these must be set
// can use plain css files 
