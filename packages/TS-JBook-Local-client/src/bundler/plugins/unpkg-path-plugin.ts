import * as esbuild from 'esbuild-wasm';
     
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entryn file of index.js
      build.onResolve({ filter: /(^index\.js$)/ },() => { //regex for index.js
        return { path: 'index.js', namespace: 'a' } //uses this path to load the file (and goes to onLoad step)
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => { //regex for ./ and ../
      return {
        namespace: 'a',
        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        // '/' to contruct the URL relative to path
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
    },
  };
};

// here hardcoding 2 files in content - ref hardcode.png

// onResolve step looks at entryPoint
// ref pluginExplanation.png

// defining the same namespace in onresove and onLoad 
// links them - that onResolve can be used only in that 
// particular namespace onLoad function

// the medium-test-pkg has an import to a file in relative path
// to tackle this URL constructor is used to create URLs for
// relative imports

// for nested file structure using the previous dir URL path
// by getting the redirected URL (eg. https://nested-test-pkg redirects to https://nested-test-pkg/src/index.js)
// to created the new URL path

// new URL ('./utils', 'https://unpkg.com/medium-test-pkg').href
// https://unpkg.com/medium-test-pkg/utils

// new URL ('../utils', 'https://unpkg.com/medium-test-pkg').href
// https://unpkg.com/utils

// new URL ('./', 'https://unpkg.com/nested-test-pkg@1.0.0/src/index.js').href
// https://unpkg.com/nested-test-pkg@1.0.0/src/

// to get the retuen value type ctlr click on onLoad then in that file ctrl click on onLoadResult - below
// export interface OnLoadResult {
//   pluginName?: string;

//   errors?: PartialMessage[];
//   warnings?: PartialMessage[];

//   contents?: string | Uint8Array;
//   resolveDir?: string;
//   loader?: Loader;
//   pluginData?: any;

//   watchFiles?: string[];
//   watchDirs?: string[];
// }

// build.onResolve({ filter: /.*/ }, async (args: any) => {
// { filter: /.*/ } - whether the file is given or not this function must be executed
