import {Express} from "express";
import AppDataSource from "./typeorm.config";

AppDataSource.initialize().then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.log('Failed to connect to database:', error);
});


const express = require('express');
const config = require('config');
const http = require('http');
const cors = require('cors');
const bodyParser = require("body-parser");

const HOST = config.get('Dev.programConfig.host');
const PORT = config.get('Dev.programConfig.port');

const app: Express = express()
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

server.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT} ...`)
})