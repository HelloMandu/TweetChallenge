import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Path from "../../path";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyPage from './MyPage';

const AuthPage: React.FC = () => {
    return (
        <Switch>
            <Route path={Path.auth.login} component={LoginPage} />
            <Route path={Path.auth.register} component={RegisterPage} />
            <Route path={Path.auth.mypage} component={MyPage} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AuthPage;
