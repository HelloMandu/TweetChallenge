import React from "react";
import MainContainer from "../../container/MainContainer";
import LoginContainer from "../../container/auth/LoginContainer";

const LoginPage: React.FC = () => {
    const JWT_TOKEN = sessionStorage.getItem("user");
    return <>{JWT_TOKEN ? <MainContainer /> : <LoginContainer />}</>;
};

export default LoginPage;
