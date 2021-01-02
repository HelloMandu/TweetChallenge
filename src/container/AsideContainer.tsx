import React from "react";
import { useSelector } from "react-redux";
import { RootState } from '../store/index';

import AsideWrapper from "../components/aside/AsideWrapper";
import MyChallenges from "../components/aside/MyChallenes";
import Profile from '../components/aside/Profile';

const challenges = [
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
    {
        profile: 'images/profile.png',
        description: '아침 08:00시 일어나기'
    },
]

const AsideContainer: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const isOn = useSelector((state: RootState) => state.aside);
    const JWT_TOKEN = sessionStorage.getItem('user');
    return (
        <AsideWrapper isOn={isOn}>
            <Profile user={JWT_TOKEN ? user : null}/>
            <MyChallenges challenges={challenges} />
        </AsideWrapper>
    );
};

export default AsideContainer;
