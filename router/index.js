const express = require("express");

const router = express.Router();

router.post("/signup", require("./signUp"));
router.post("/login", require("./login"));
router.get("/auth", require("./auth"));
router.get("/logout", require("./logOut"));

module.exports = router;