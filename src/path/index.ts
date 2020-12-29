export const API_SERVER = 'http://localhost:8080';

const Path: any = {
    main: {
        index: '/',
        detail: '/detail',
    },
    auth: {
        index: '/auth',
        login: '/auth/login',
        register: '/auth/register',
        mypage: '/auth/mypage',
    },
    api: '/api',
};

export default Path;