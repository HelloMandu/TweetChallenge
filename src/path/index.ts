export const API_SERVER: string = 'http://localhost:3000';
const path: any = {
    index: '/',
    auth: {
        index: '/auth',
        login: '/auth/login',
        register: '/auth/register',
    },
    api: API_SERVER + '/api/',
    storage: API_SERVER + '/uploads/',
};

export default path;