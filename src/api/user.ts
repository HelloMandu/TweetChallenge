import axios from "axios";
import Path from "../path";

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

export const requestPostRegister = async (name: string, email: string, password: string, birth: Date) => {
    const URL = Path.api + '/user';
    const response = await axios.post(URL, { name, email, password, birth });
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