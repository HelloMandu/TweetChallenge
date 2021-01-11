import axios from 'axios';
import Path from '../path';
import makeFormData from '../lib/makeFormData';

export const requestGetChallenges = async (offset: number) => {
    const URL = Path.api + '/challenge';
    const response = await axios.get(URL, { params: { offset } });
    return response.data;
}

export const requestGetChallengeDetail = async (id: string) => {
    const URL = Path.api + '/challenge/' + id;
    const response = await axios.get(URL);
    return response.data;
}

export const requestPostEnroll = async (JWT_TOKEN: string, title: string, description: string, kind: string, start: Date, end: Date, verifyStart: Date, verifyEnd: Date, profile: File) => {
    const URL = Path.api + '/challenge';
    const options = {
        headers: {
            authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const formData = makeFormData({
        title, description, kind, start, end, verifyStart, verifyEnd, profile
    });
    const response = await axios.post(URL, formData, options);
    return response.data;
}

export const requestPostParticipate = async (JWT_TOKEN: string, id: string) => {
    const URL = Path.api + '/challenge/participate';
    const options = {
        headers: {
            authorization: `Bearer ${JWT_TOKEN}`
        }
    }
    const response = await axios.post(URL, { id }, options);
    return response.data;
}