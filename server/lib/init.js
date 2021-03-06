const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const Challenge = require('../schemas/challenge');

const testUser = {
    email: 'test@gmail.com',
    password: 'testpassword!@',
    name: '테스트',
    birth: new Date('1996/07/09'),
    profile: 'images/profile.png',
};

const challenges = [
    {
        title: '아침 08:00시 조깅하기',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/health.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '매일 헬스장 가기',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/health2.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '아침 08:00시 헬스장 인증',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/health3.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '매일 7시간 공부하기',
        kind: '공부',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/study.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '메일 7시간 독서하기',
        kind: '공부',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/reading.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '아침 06:00시 기상',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/morning.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '아침 07:00시 기상',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/morning2.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
    {
        title: '아침 08:00시 기상',
        kind: '건강',
        start: '2021/01/01',
        end: '2022/01/01',
        verifyStart: '2021/01/01 00:00',
        verifyEnd: '2021/01/01 23:59',
        profile: 'images/morning3.jpg',
        description: `
        스터디, 독서, 운동, 홈트...
        계획을 세우고 잘 못 지키는 일이 있나요?
        
        늘어진 생활패턴을 다시 바로 잡고 싶다면
        무기력한 일상에 활력을 되찾고 싶다면
        지금 챌린지를 시작하세요.
        
        작은 습관을 반복해서 인생을 변화시킬 수 있도록 도와드릴게요.`,
    },
];

module.exports = async () => {
    try {
        const hashedPassword = await bcrypt.hash(testUser.password, 12);
        await new User({ ...testUser, password: hashedPassword }).save();
        const [initUser] = await User.find({ email: testUser.email }).exec();
        const { _id } = initUser;
        [...new Array(5)].forEach(() => {
            challenges.forEach(async (challenge) => {
                try {
                    const { title, kind, start, end, verifyStart, verifyEnd, profile, description } = challenge;
                    const newChallenge = new Challenge({
                        title,
                        kind,
                        profile,
                        start: new Date(start),
                        end: new Date(end),
                        verifyStart: new Date(verifyStart),
                        verifyEnd: new Date(verifyEnd),
                        description,
                        user: _id,
                    });
                    await newChallenge.save();
                } catch (e) {
                    console.error(e);
                }
            });
        });
    } catch (e) {
        console.error(e);
    }
};
