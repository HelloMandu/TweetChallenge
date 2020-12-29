import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import Header from '../components/header/Header';

const HeaderContainer: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const JWT_TOKEN = sessionStorage.getItem('user');
    return<Header user={JWT_TOKEN ? user : null}></Header>
}

export default HeaderContainer