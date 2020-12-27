import React, { useCallback, useEffect } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Path from "./path";
import { getUser } from './store/user';

import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/auth/AuthPage';

import './App.scss';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const judgementUser = useCallback(() => {
        const JWT_TOKEN = localStorage.getItem('user');
        if (JWT_TOKEN) {
            dispatch(getUser(JWT_TOKEN));
        }
    }, [dispatch]);
    useEffect(judgementUser, [judgementUser])
    return (
        <Switch>
            <Route path={Path.main.index} component={MainPage} exact />
            <Route path={Path.main.detail} component={DetailPage} />
            <Route path={Path.auth.index} component={AuthPage} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default App;
