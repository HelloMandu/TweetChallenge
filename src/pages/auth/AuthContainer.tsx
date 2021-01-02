import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Path from "../../path";
import SinginContainer from "./SinginContainer";
import SignupContainer from "./SignupContainer";
import MyContainer from './MyContainer';

const AuthPage: React.FC = () => {
    return (
        <Switch>
            <Route path={Path.auth.login} component={SinginContainer} />
            <Route path={Path.auth.register} component={SignupContainer} />
            <Route path={Path.auth.mypage} component={MyContainer} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AuthPage;
