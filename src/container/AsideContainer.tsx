import React from "react";
import { useSelector } from "react-redux";
import AsideWrapper from "../components/aside/AsideWrapper";
import MyChallenges from "../components/aside/MyChallenes";
import Profile from '../components/aside/Profile';
import { RootState } from '../store/index';

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
]

interface AsideContainerProps{
    isOn: boolean
}

const AsideContainer: React.FC<AsideContainerProps> = ({isOn}) => {
    const user = useSelector((state: RootState) => state.user);
    const JWT_TOKEN = sessionStorage.getItem('user');
    return (
        <AsideWrapper isOn={isOn}>
            <Profile user={JWT_TOKEN ? user : null}/>
            <MyChallenges challenges={challenges} />
        </AsideWrapper>
    );
};

export default AsideContainer;
