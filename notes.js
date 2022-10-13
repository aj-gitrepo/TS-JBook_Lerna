// section 21 The Path -Lerna
// to allow user to save/load a user's notebook from their hard drive  
// by letting the user run only the CLI which runs the Local Node API which runs Build Client Files(index.html and index.js) and the locally saves notebook(where all the cells are saved) of the user

// Lerna CLI - Tool for managing multi-package project
// use only version v3.22.1 of lerna
// >npm install -g --save-exact lerna@3.22.1 - using this
// >yarn add lerna@3.22.1 --exact

// renaming the parent folder(jbook) as local-client
// git remote remove origin
// create a directory called jbook adjuscent to this 
// in jbook terminal
// >lerna init
// then drag this local-client folder into the pakages folder of jbook

// creating cli and local-api folders in pakages and adding package.json file to them
// >cd .. (going to packages folder)
// >mkdir cli    
// >mkdir local-api
// >cd cli
// >yarn init -y
// >cd ..
// >cd local-api
// >yarn init -y
// >cd ..

// when using lerna we do not manually NPM install modules instead, we use the command lerna add
// https://github.com/lerna/lerna
// https://lerna.js.org/docs/api-reference/commands

// lerna add - will add the dependecy to all the folders in the packages 
// so use scope eg: lerna add commander --scope=cli
// the command can be run in any folder under the packages
// >lerna add commander --scope=cli

// to add submodule
// git submodule add https://github.com/QuasiFino/TS-JBook-Local-client.git
// then install dependencies in that folder

// make sure the main option in package.json is index.js
// create index.js in local-api
// >lerna add local-api --scope=cli
// >cd cli
// >node index.js

// In the upcoming lecture, we will be using an npx command to generate a tsconfig file. What is shown no longer works and will throw the following error: npm ERR! could not determine executable to run Instead, we need to run the following command:

// npx tsc --init

// Note - This will be used again in the Adding TypeScript Support to the CLI lecture.

// to work in ts to convert all the code into transpile ts and place it in dist/index.js
// >lerna add typescript --dev --scope=local-api
// >cd local-api
// >npx tsc --init

// delete index.js from local-api folder and instead create src folder and create index.ts file in it
// in tsconfig.json in local-api uncomment "outDir": "./",  and replace with "outDir": "./dist",  and uncomment "declaration": true, - gives type definition file

// in package.json add
  // "scripts": {
  //   "start": "tsc --watch --preserveWatchOutput"
  // },

// in local-api terminal
// >yarn start
// now the dist folder gets created

// in package.json in local-api
// update to "main": "dist/index.js",
// add "types": "dist/index.d.ts",

// adding ts support in cli folder
// create src folder and move index.js into it and rename it as .ts
// >cd cli
// >lerna add typescript --dev --scope=cli
// >npx tsc --init

// in tsconfig.json of cli folder
// uncomment "outDir": "./",  and replace with "outDir": "./dist",  
// no need to uncomment declaration because cli is not going to be anywhere

// in package.json in cli
// delete "main" - because cli is not going to be anywhere
// add
  // "scripts": {
  //   "start": "tsc --watch --preserveWatchOutput"
  // },

// >yarn start
// >cd dist - under cli
// >node index.js

// to execute yarn start or npm run start (both is working) in all  the packages at same time
// in package.json of jbook
// add
  // "scripts": {
  //   "start": "lerna run start --parallel"
  // }

// now running yarn start in jbook terminal runs start in all the packages

// section 22: Creating the CLI

// to allow the user specify the name of the file and to specify the port 
// eg
// jbook serve
// jbook serve mynotes.js
// jbook serve mynotes.js --port 3050
// jbook serve --port 3050

// in cli/src folder create commands folder inside it create serve.ts 
// to enable the use of process.argv
// >lerna add @types/node --dev --scope=cli //here -- dev for development dependency
// >cd cli
// >cd dist
// >node index.js serve
// it automatically generates the help command
// >node index.js --help

// section23 - Adding a Local-Only API

// lerna can add only one package at a time
// >lerna add express --scope=local-api
// >lerna add @types/express --dev --scope=local-api
// >lerna add cors --scope=local-api
// >lerna add @types/cors --dev --scope=local-api
// >lerna add http-proxy-middleware --scope=local-api

// In the upcoming lecture, we will be completing the catch handler of our serve.ts file. You will have likely noticed some TS errors: error TS2571: Object is of type 'unknown'. We will need to solve this by adding a type guard, as well as adding a type predicate. 

// To resolve, make the following changes:

// 1) Add an interface:

//     interface LocalApiError {
//       code: string;
//     }

// 2) Add a function to return the predicate:

//     ...
     
//       .action(async (filename = "notebook.js", options: { port: string }) => {
     
//         const isLocalApiError = (err: any): err is LocalApiError => {
//           return typeof err.code === "string";
//         };
     
//     ...

// 3) Update the catch block to use the type guards:

//     ...
     
//         } catch (err) {
//           if (isLocalApiError(err)) {
//             if (err.code === "EADDRINUSE") {
//               console.error("Port is in use. Try running on a different port.");
//             }
//           } else if (err instanceof Error) {
//             console.log("Heres the problem", err.message);
//           }
//           process.exit(1);
//         }
//       });
     
//     ...


// >cd local-client
// >yarn run build
