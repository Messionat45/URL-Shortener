const express = require("express");
const router = express.Router();
const { url_input } = require("../controller/urlController");

router.post("/url", url_input);

module.exports = router;
