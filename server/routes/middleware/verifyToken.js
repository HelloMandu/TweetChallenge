const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ msg: "로그인 후에 이용해 주세요." });
        }
        const CLIENT_TOKEN = req.headers.authorization.split("Bearer ")[1];
        const decoded = jwt.verify(CLIENT_TOKEN, process.env.JWT_SECRET);
        if (decoded) {
            const { _id } = decoded;
            if (_id) {
                req.decodeToken = decoded;
                next();
            } else {
                res.status(401).json({ msg: "잘못된 로그인 정보입니다." });
            }
        } else {
            res.status(401).json({ msg: "잘못된 로그인 정보입니다." });
        }
    } catch (err) {
        res.status(401).json({ msg: "잘못된 로그인 정보입니다." });
    }
};

module.exports = verifyToken;
