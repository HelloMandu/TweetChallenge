import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import LoginContainer from "../../container/auth/LoginContainer";

const LoginPage = ({ match }: RouteComponentProps) => {
    return <LoginContainer />;
};

export default LoginPage;
