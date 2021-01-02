const express = require("express");
const router = express.Router();

const verifyToken = require("./middleware/verifyToken");
const upload = require("./middleware/upload");
const omissionChecker = require("../lib/omissionChecker");

const User = require("../schemas/user");
const Challenge = require("../schemas/challenge");

/*CREATE*/
router.post("/", verifyToken, upload.single("profile"), async (req, res) => {
    const { title, kind, start, end, verifyStart, verifyEnd } = req.body;
    const omissionResult = omissionChecker({
        title,
        kind,
        start,
        end,
        verifyStart,
        verifyEnd,
    });
    if (!omissionResult.result) {
        return res.status(202).send({ msg: omissionResult.message });
    }
    try {
        if (!req.file) {
            return res.status(202).send({ msg: "이미지를 등록해 주세요" });
        }
        const { _id } = req.decodeToken;
        const newChallenge = new Challenge({
            title,
            kind,
            profile: req.file.path,
            start,
            end,
            verifyStart: new Date(verifyStart),
            verifyEnd: new Date(verifyEnd),
            user: _id,
        });
        const created = await newChallenge.save();
        if (!created) {
            return res
                .status(202)
                .send({ msg: "챌린지 등록에 실패하였습니다." });
        }
        res.status(201).json({ msg: "success" });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*participate*/
router.post("/participate", verifyToken, async (req, res) => {
    const { _id } = req.decodeToken;
    const { id: challengeId } = req.body;
    const omissionResult = omissionChecker({
        challengeId,
    });
    if (!omissionResult.result) {
        return res.status(202).send({ msg: omissionResult.message });
    }
    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            return res.status(202).send({ msg: "가입하지 않은 이메일입니다." });
        }
        const challenge = await Challenge.findById(challengeId).exec();
        if (!challenge) {
            return res.status(202).send({ msg: "등록되지 않은 챌린지입니다." });
        }
        const updated = await User.findByIdAndUpdate(_id, {
            $push: { participated: challengeId },
        });
        if (!updated) {
            return res
                .status(202)
                .send({ msg: "챌린지 참여에 실패하였습니다." });
        }
        res.status(201).json({ msg: "success" });
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
