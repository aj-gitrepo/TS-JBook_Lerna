import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: {port: string}) => { //options based on option
    // adding type gaurd
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    }; 
    try { //incase the user opens the existing port
      const dir = path.join(process.cwd(), path.dirname(filename))
      await serve(parseInt(options.port), path.basename(filename), dir);
      console.log(`Opened ${filename}. Navigate to http://locathost:${options.port} to edit the file`)
    } catch (err: any) {
      if (isLocalApiError(err)) {
        if(err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a dirrent port.")
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });

// define what to do when a user runs 'serve' command
// option('-p, --port <number>', 'port to run server on', '4005')
  // '-p, --port <number>' - port options
  // 'port to run server on' - defining string
  // '4005' - default value, which will be parsed into number

// [] - optional value
// <> - required value

// filename = 'notebook.js' - default file name

// in dist directory of cli folder
// >node index.js serve - take default val for filename and port
// >node index.js serve book.js
// >node index.js serve book.js --port 5000
// >node index.js serve book.js --port=5000
// >node index.js serve book.js -p 5000 
// >node index.js serve -p 5000 book.js

// if the user gives the path along with the file name, 
// inorder to return only the directory name excluding the file name
// path.dirname(filename)
// eg. jbook serve js-notes/notbook.js - gives only js-notes/ (gives abs path)

// basename just gives the filename

// .action((filename = 'notebook.js', options: {port: string}) => { //options based on option
//   console.log("Getting ready to serve a file!");
//   console.log(
//     path.join(process.cwd(), path.dirname(filename))
//   );
//   console.log(
//     path.basename(filename)
//   );
//   serve(parseInt(options.port), filename, '/');
// });
// assume there is a notes directory
// >node index.js serve notes/notebook.js
  // Getting ready to serve a file!
  // C:\all\typescript react\sec21\jbook\packages\cli\dist\notes
  // notebook.js
  // serving traffic on port 4005
  // saving/fetching cells from notes/notebook.js
  // that file is in dir /

// >node index.js serve notebook.js
