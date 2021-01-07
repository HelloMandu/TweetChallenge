export const API_SERVER = 'http://localhost:8080';

const Path: any = {
    main: {
        index: '/',
        detail: '/detail',
        enroll: '/enroll',
    },
    auth: {
        index: '/auth',
        signin: '/auth/signin',
        signup: '/auth/signup',
        mypage: '/auth/mypage',
    },
    api: '/api',
};

export default Path;