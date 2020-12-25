import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import path from "./path";

import './App.scss';

const App: React.FC = () => {
    return (
        <Switch>
            <Route path={path.auth.login} component={Login} />
            <Route path={path.auth.register} component={Register} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default App;
