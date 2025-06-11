require("dotenv").config();
const express = require("express");
const dbconn = require("./db.js");

const app = express();
const port = 5000;

dbconn();
app.listen(port, () => console.log("conn to server"));
