const express = require("express");
const router = express.Router();

const user = require("./user");
const challenge = require("./challenge");

router.use("/user", user);
router.use("/challenge", challenge);

module.exports = router;
