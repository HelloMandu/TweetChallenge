import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Path from "../../path";
import { requestPostSignin } from "../../api/user";

import useNotistack from "../../hooks/useNotistack";

import Signin from "../../components/auth/Signin";
import AuthWrapper from "../../components/auth/AuthWrapper";
import { useLogin } from '../../hooks/useAuth';

const SigninContainer: React.FC = () => {
    const history = useHistory();
    const handleNotistack = useNotistack();
    const handleLogin = useLogin();
    const handleSignin = useCallback(
        async (email: string, password: string) => {
            try {
                const { msg, token } = await requestPostSignin(email, password);
                if (msg === "success") {
                    sessionStorage.setItem("user", token);
                    handleLogin(token);
                    history.push(Path.main.index);
                } else {
                    handleNotistack(msg, "warning");
                }
            } catch (e) {
                handleNotistack("로그인 도중 오류가 발생했습니다.", "error");
            }
        },
        [handleLogin, handleNotistack, history]
    );

    const JWT_TOKEN: string | null = sessionStorage.getItem("user");
    useEffect(() => {
        if (JWT_TOKEN) {
            history.replace(Path.main.index);
        }
    }, [JWT_TOKEN, history]);
    return (
        <AuthWrapper>
            <Signin handleSignin={handleSignin} />
        </AuthWrapper>
    );
};

export default SigninContainer;
