const express = require("express");
const router = express.Router();
const { url_input, url_search } = require("../controller/url/urlController");
const signUp = require("../controller/signup/signupController");
const login = require("../controller/signup/loginController");
const auth = require("../middlewear/jwtauth");
const display = require("../controller/url/displayURL");

router.post("/url", auth, url_input);
router.get("/s/:shortID", url_search);

router.post("/signup", signUp);
router.post("/login", login);

router.get("/url", auth, display);

module.exports = router;
