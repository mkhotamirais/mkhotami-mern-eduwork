require("dotenv").config();
const { resolve } = require("path");

const rootPath = resolve(__dirname, "..");
const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN_SECRET: ats, REFRESH_TOKEN_SECRET: rts } = process.env;

module.exports = { port, uri, rootPath, ats, rts };
