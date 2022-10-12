import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', options: {port: string}) => { //options based on option
    console.log("Getting ready to serve a file!");
    serve(parseInt(options.port), filename, '/');
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

