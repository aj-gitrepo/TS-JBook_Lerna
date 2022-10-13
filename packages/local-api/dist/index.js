"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    // for development using app in port 3000, now if 4005 is opend the app opens
    if (useProxy) {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        // for production - to serve the react app
        const packagePath = require.resolve('local-client/build/index.html'); //helps to get to th file using algorithm
        app.use(express_1.default.static(path_1.default.dirname(packagePath))); //path uptill /build
    }
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    // to enable the try catch block (in cli/serve.ts) to work
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
// naive solution to access the app - not good becaue each folder (cli, local-api, local-client)
// is going to be a seperate package in npm
// app.use(express.static('../../local-client/build'));
// can create a dependency in local-api to local-client
