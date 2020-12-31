import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import Header from '../components/header/Header';

interface HeaderContainerProps{
    toggleAside: () => void;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({toggleAside}) => {
    const user = useSelector((state: RootState) => state.user);
    const JWT_TOKEN = sessionStorage.getItem('user');
    return<Header user={JWT_TOKEN ? user : null} toggleAside={toggleAside}></Header>
}

export default HeaderContainer