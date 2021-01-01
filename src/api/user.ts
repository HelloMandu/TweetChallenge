import axios from "axios";
import Path from "../path";
import makeFormData from '../lib/makeFormData';

export const requestGetUserInfo = async (JWT_TOKEN: string) => {
    const URL = Path.api + '/user';
    const options = {
        headers: {
            authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const response = await axios.get(URL, options);
    return response.data;
}

export const requestPostRegister = async (profile: File | null, name: string, email: string, password: string, birth: Date) => {
    const URL = Path.api + '/user';
    const options = {
        headers: {
            ContentType: 'multipart/form-data',
        }
    }
    const formData = makeFormData({profile, name, email, password, birth});
    const response = await axios.post(URL, formData, options);
    return response.data;
}

export const requestPostSignin = async (email: string, password: string) => {
    const URL = Path.api + '/user/signin';
    const response = await axios.post(URL, { email, password });
    return response.data;
}

export const requestPostLogout = async (JWT_TOKEN: string) => {
    const URL = Path.api + '/user/logout';
    const options = {
        headers: {
            authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const response = await axios.post(URL, {}, options);
    return response.data;
}