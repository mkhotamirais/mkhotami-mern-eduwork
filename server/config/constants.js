require("dotenv").config();
const { resolve } = require("path");

const rootPath = resolve(__dirname, "..");
const { PORT: port, MONGO_URI: uri } = process.env;

module.exports = { port, uri, rootPath };
