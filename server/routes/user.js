const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

router.post("/", async (req, res) => {
    const { email, password, name, birth } = req.body;
    try {
        const newUser = new User({ email, password, name, birth });
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (e) {
        res.status(500, { e });
    }
});

module.exports = router;
