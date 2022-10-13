"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises")); //allows to write async await code without callbacks unlike 'fs'
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json()); //body parsing middleware
    const fullPath = path_1.default.join(dir, filename);
    router.get('cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //  to add a type guard and type predicate
        const isLocalApiError = (err) => {
            return typeof err.code === "string";
        };
        // Make sure the cell storage file exists
        // If it does not exist, add in a default list of cells
        // Parse a list of cells out of it
        // Send list of cells back to browser
        try {
            // Read the file
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        }
        catch (err) {
            // If read throws an error
            // Inspect the error, see if it says that the file doesn't exist
            if (isLocalApiError(err)) {
                if (err.code === "ENOENT") { //Error No Entity
                    // Add code to create a file and add default cells
                    yield promises_1.default.writeFile(fullPath, "[]", "utf-8"); //storing empty array
                    res.send([]);
                }
            }
            else {
                throw err;
            }
        }
    }));
    router.post('cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Take the list of cells from the request obj
        // serialize them (list of cells has id, content and type )
        const { cells } = req.body;
        // Write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'ok' });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
// utf-8 - plain text
