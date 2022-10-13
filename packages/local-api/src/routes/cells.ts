import express from 'express';
import fs from 'fs/promises'; //allows to write async await code without callbacks unlike 'fs'
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json()); //body parsing middleware

  const fullPath = path.join(dir, filename);

  router.get('cells', async (req, res) => {
    //  to add a type guard and type predicate
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };
    // Make sure the cell storage file exists
    // If it does not exist, add in a default list of cells
    // Parse a list of cells out of it
    // Send list of cells back to browser

    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (err) {
      // If read throws an error
      // Inspect the error, see if it says that the file doesn't exist
      if(isLocalApiError(err)) {
        if(err.code === "ENOENT") { //Error No Entity
          // Add code to create a file and add default cells
          await fs.writeFile(fullPath, "[]", "utf-8"); //storing empty array
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post('cells', async (req, res) => {
    // Take the list of cells from the request obj
    // serialize them (list of cells has id, content and type )
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};

// utf-8 - plain text
