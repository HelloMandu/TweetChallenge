import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Path from './path';

import { useLogin } from './hooks/useAuth';

import HeaderContainer from './container/HeaderContainer';
import AsideContainer from './container/AsideContainer';
import MainContainer from './container/MainContainer';
import DetailContainer from './container/challenge/DetailContainer';
import EnrollContainer from "./container/challenge/EnrollContainer";
import AuthContainer from './container/auth/AuthContainer';
import DialogContainer from './container/DialogContainer';
import './App.scss';

const App: React.FC = () => {
    const handleLogin = useLogin();
    const judgementUser = useCallback(() => {
        const JWT_TOKEN = sessionStorage.getItem('user');
        if (JWT_TOKEN) {
            handleLogin(JWT_TOKEN);
        }
    }, [handleLogin]);
    useEffect(judgementUser, [judgementUser]);
    return (
        <>
            <HeaderContainer />
            <DialogContainer />
            <div className={'root-container'}>
                <AsideContainer />
                <Switch>
                    <Route path={Path.main.index} component={MainContainer} exact />
                    <Route path={Path.main.detail + '/:id?'} component={DetailContainer} />
                    <Route path={Path.main.enroll} component={EnrollContainer} />
                    <Route path={Path.auth.index} component={AuthContainer} />
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </div>
        </>
    );
};

export default App;
