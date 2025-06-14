require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const dbconn = require("./db.js");
const urlRoutes = require("./routes/urlRouter.js");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(urlRoutes);
dbconn();
app.listen(port, () => console.log(`conn to server at ${port}`));
