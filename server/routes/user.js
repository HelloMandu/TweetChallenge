const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = require("./middleware/verifyToken");
const upload = require("./middleware/upload");
const omissionChecker = require("../lib/omissionChecker");

const User = require("../schemas/user");
const Challenge = require("../schemas/challenge");

/*CREATE*/
router.post("/", upload.single("profile"), async (req, res) => {
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
        const profile = req.file ? req.file.path : "images/profile.png";
        const [existUser] = await User.find({ email }).exec();
        if (existUser) {
            return res.status(202).send({ msg: "이미 가입한 이메일입니다." });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        if (!hashedPassword) {
            return res
                .status(202)
                .send({ msg: "비밀번호를 설정하지 못했습니다." });
        }
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            birth: new Date(birth),
            profile,
        });
        const created = await newUser.save();
        if (!created) {
            return res.status(202).send({ msg: "회원가입에 실패하였습니다." });
        }
        res.status(201).json({ msg: "success" });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*myinfo*/
router.get("/", verifyToken, async (req, res) => {
    const { _id } = req.decodeToken;
    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        const challenges = await Challenge.find({ user:_id }).exec();
        const { email, name, birth, profile } = user;
        res.status(200).json({
            msg: "success",
            user: { email, name, birth, profile, challenges },
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*update*/
router.put("/", verifyToken, async (req, res) => {
    const { _id } = req.decodeToken;
    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        const { email, name, birth, profile } = user;
        const updated = await User.findByIdAndUpdate(_id, {
            email,
            name,
            birth,
            profile,
        });
        if (!updated) {
            return res
                .status(202)
                .send({ msg: "개인정보 수정에 실패하였습니다." });
        }
        res.status(200).json({ msg: "success" });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*Login*/
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const omissionResult = omissionChecker({ email, password });
    if (!omissionResult.result) {
        return res.status(202).send({ msg: omissionResult.message });
    }
    try {
        const [existUser] = await User.find({ email }).exec();
        if (!existUser) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        const result = await bcrypt.compare(password, existUser.password);
        if (!result) {
            return res
                .status(202)
                .send({ msg: "비밀번호가 일치하지 않습니다." });
        }
        const token = jwt.sign(
            {
                _id: existUser._id,
            },
            process.env.JWT_SECRET
        ); // JWT_TOKEN 생성.
        if (!token) {
            return res
                .status(202)
                .send({ msg: "token을 생성하지 못했습니다." });
        }
        return res.status(200).send({ msg: "success", token });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*Logout*/
router.post("/logout", verifyToken, async (req, res, next) => {
    const { _id } = req.decodeToken; // JWT_TOKEN에서 추출한 값 가져옴
    try {
        const existUser = await User.findById(_id).exec();
        if (!existUser) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        return res.status(200).send({ msg: "success" });
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
