import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import RegisterContainer from "../../container/auth/RegisterContainer";

const LoginPage = ({ match }: RouteComponentProps) => {
    return <RegisterContainer />;
};

export default LoginPage;
