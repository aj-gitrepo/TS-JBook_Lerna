"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    // naive solution to access the app - not good becaue each folder (cli, local-api, local-client)
    // is going to be a seperate package in npm
    app.use(express_1.default.static('../../local-client/build'));
    // can create a dependency in local-api to local-client
    // for development using app in port 3000, now if 4005 is opend the app opens
    // app.use(
    //   createProxyMiddleware({
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     logLevel: 'silent',
    //   })
    // );
    // to enable the try catch block (in cli/serve.ts) to work
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
