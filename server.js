require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbconn = require("./db.js");
const urlRoutes = require("./routes/urlRouter.js");
// const beUrl = process.env.LOCAL_BE_URL || process.env.BE_URL;

const app = express();
const port = 5000;

app.use(
  cors({
    origin: ["https://miniurl45.netlify.app", "http://localhost:5500"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(urlRoutes);
dbconn();
app.listen(port, () => console.log(`conn to server at ${port}`));
