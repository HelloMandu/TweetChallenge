const bcrypt = require("bcrypt");
const User = require("../schemas/user");
const Challenge = require("../schemas/challenge");

const testUser = {
    email: "test@gmail.com",
    password: "testpassword!@",
    name: "테스트",
    birth: new Date("1996/07/09"),
    profile: 'images/profile.png'
};

const challenges = [
    {
        title: "아침 08:00시 조깅하기",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/health.jpg'
    },
    {
        title: "매일 헬스장 가기",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/health2.jpg'
    },
    {
        title: "아침 08:00시 헬스장 인증",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/health3.jpg'
    },
    {
        title: "매일 7시간 공부하기",
        kind: "공부",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/study.jpg'
    },
    {
        title: "메일 7시간 독서하기",
        kind: "공부",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/reading.jpg'
    },
    {
        title: "아침 06:00시 기상",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/morning.jpg'
    },
    {
        title: "아침 07:00시 기상",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/morning2.jpg'
    },
    {
        title: "아침 08:00시 기상",
        kind: "건강",
        start: "2021/01/01",
        end: "2022/01/01",
        verifyStart: "2021/01/01 00:00",
        verifyEnd: "2021/01/01 23:59",
        profile: 'images/morning3.jpg'
    },
];

module.exports = async () => {
    try{
        const hashedPassword = await bcrypt.hash(testUser.password, 12);
        await new User({ ...testUser, password: hashedPassword }).save();
        const [initUser] = await User.find({ email: testUser.email }).exec();
        const { _id } = initUser;
        challenges.forEach(async (challenge) => {
            try{
                const { title, kind, start, end, verifyStart, verifyEnd, profile } = challenge;
                const newChallenge = new Challenge({
                    title,
                    kind,
                    profile,
                    start: new Date(start),
                    end: new Date(end),
                    verifyStart: new Date(verifyStart),
                    verifyEnd: new Date(verifyEnd),
                    user: _id
                });
                await newChallenge.save();
            } catch(e){
                console.error(e)
            }

        });
    } catch(e){
        console.error(e);
    }
};
