import {Express, request} from "express";
import AppDataSource from "./typeorm.config";
import * as path from "path";
AppDataSource.initialize().then(() : void => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Failed to connect to database:', error);
});

const publicPath: string = path.join(__dirname, "..", "public");
const express = require('express');
const config = require('config');
const http = require('http');
const cors = require('cors');
const bodyParser = require("body-parser");

const HOST = config.get('Dev.programConfig.host');
const PORT = config.get('Dev.programConfig.port');

const app: Express = express()
const server = http.createServer(app);

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const uploadRoute = require("./routes/upload.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("", uploadRoute);

server.listen(PORT, () : void => {
    console.log(`Server has been started on port ${PORT} ...`)
})