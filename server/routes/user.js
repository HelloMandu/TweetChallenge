const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const verifyToken = require('./middleware/verifyToken');
const omissionChecker = require("../lib/omissionChecker");

const User = require("../schemas/user");

/*CREATE*/
router.post("/", async (req, res) => {
    const { email, password, name, birth } = req.body;
    const omissionResult = omissionChecker({
        email,
        password,
        name,
        birth,
    });
    if (!omissionResult.result) {
        return res.status(202).send({ msg: omissionResult.message });
    }
    try {
        const existUser = User.findOne({ email });
        if (existUser) {
            return res.status(202).send({ msg: "이미 가입한 이메일입니다." });
        }
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            return res.status(202).send({ msg: '비밀번호를 설정하지 못했습니다.' });
        }
        const newUser = new User({
            email,
            password,
            name,
            birth: new Date(birth),
        });
        const user = await newUser.save();
        const token = jwt.sign(
            {
                _id: newUser._id,
                email,
            },
            process.env.JWT_SECRET,
        );
        if (!token) {
            return res.status(202).send({ msg: 'token을 생성하지 못했습니다.' });
        }
        res.status(201).json({ msg: "success", user });
    } catch (e) {
        res.status(500, { e });
    }
});

/*Read*/
router.get("/", verifyToken, async (req, res) => {
    const {_id, email} = req.decodeToken;
    try {
        const user = User.findOne({ _id, email });
        if (!user) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        res.status(200).json({ msg: "success", user });
    } catch (e) {
        res.status(500, { e });
    }
});

/*Login*/
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const omissionResult = omissionChecker({ email, password });
    if (!omissionResult.result) {
        return res.status(202).send({ msg: omissionResult.message });
    }
    try {
        const existUser = User.findOne({
            where: { email }
        });
        if (!existUser) {
            return res.status(202).send({ msg: '가입하지 않은 이메일입니다.' });
        }
        const result = await bcrypt.compare(password, existUser.password);
        if (!result) {
            return res.status(202).send({ msg: '비밀번호가 일치하지 않습니다.' });
        }
        const token = jwt.sign(
            {
                _id: existUser._id,
                email: email,
            },
            process.env.JWT_SECRET,
        ); // JWT_TOKEN 생성.
        if (!token) {
            return res.status(202).send({ msg: 'token을 생성하지 못했습니다.' });
        }
        return res.status(200).send({ msg: 'success', token });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*Logout*/
router.post('/logout', verifyToken, async (req, res, next) => {
    const { _id, email } = req.decodeToken; // JWT_TOKEN에서 추출한 값 가져옴
    try {
        const existUser = User.findOne({
            where: { _id, email }
        });
        if (!existUser) {
            return res.status(202).send({ msg: '가입하지 않은 이메일입니다.' });
        }
        return res.status(200).send({ msg: 'success' });
    } catch (e) {
        console.error(e);
    }
});


module.exports = router;
