import React, { useCallback, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Path from "./path";
import { getUser } from "./store/user";

import HeaderContainer from "./container/HeaderContainer";
import AsideContainer from "./container/AsideContainer";
import MainContainer from "./pages/MainContainer";
import DetailContainer from "./pages/challenge/DetailContainer";
import AuthContainer from "./pages/auth/AuthContainer";

import "./App.scss";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const judgementUser = useCallback(() => {
        const JWT_TOKEN = sessionStorage.getItem("user");
        if (JWT_TOKEN) {
            dispatch(getUser(JWT_TOKEN));
        }
    }, [dispatch]);
    useEffect(judgementUser, [judgementUser]);
    return (
        <>
            <HeaderContainer />
            <div className={"root-container"}>
                <AsideContainer />
                <Switch>
                    <Route
                        path={Path.main.index}
                        component={MainContainer}
                        exact
                    />
                    <Route
                        path={Path.main.detail}
                        component={DetailContainer}
                    />
                    <Route path={Path.auth.index} component={AuthContainer} />
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </div>
        </>
    );
};

export default App;
