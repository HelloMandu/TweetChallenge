import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Path from "../../path";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import MyContainer from './MyContainer';

const AuthPage: React.FC = () => {
    return (
        <Switch>
            <Route path={Path.auth.login} component={LoginContainer} />
            <Route path={Path.auth.register} component={RegisterContainer} />
            <Route path={Path.auth.mypage} component={MyContainer} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AuthPage;
