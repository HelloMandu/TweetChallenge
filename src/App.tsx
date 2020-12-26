import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import path from "./path";

import './App.scss';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/auth/AuthPage';

const App: React.FC = () => {
    return (
        <Switch>
            <Route path={path.main.index} component={MainPage} exact />
            <Route path={path.main.detail} component={DetailPage} />
            <Route path={path.auth.index} component={AuthPage} />
            <Route component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default App;
