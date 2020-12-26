import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import path from "../../path";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyPage from './MyPage';

const AuthPage: React.FC = () => {
    return (
        <Switch>
            <Route path={path.auth.login} component={LoginPage} />
            <Route path={path.auth.register} component={RegisterPage} />
            <Route path={path.auth.mypage} component={MyPage} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AuthPage;
