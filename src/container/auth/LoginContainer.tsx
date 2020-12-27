import React, { useRef, useEffect, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Path from "../../path";
import { getUser } from "../../store/user";
import { requestPostSignin } from "../../api/user";

import useInput from "../../hooks/useInput";
import useNotistack from "../../hooks/useNotistack";

import InputBox from "../../components/inputBox/InputBox";
import BasicButton from "../../components/button/BasicButton";

import "./LoginContainer.scss";

const LoginContainer: React.FC = () => {
    const [form, onChangeForm] = useInput({ email: "", password: "" });
    const { email, password } = form;
    const [emailConfirm, setEmailConfirm] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<boolean>(false);
    const emailFocus = useRef<HTMLInputElement>(null);
    const passwordFocus = useRef<HTMLInputElement>(null);
    const loginFocus = useRef<HTMLButtonElement>(null);

    useEffect(() => emailFocus.current?.focus(), []);
    useEffect(() => setEmailConfirm(email.length), [email]);
    useEffect(() => setPasswordConfirm(password.length), [password]);

    const history = useHistory();
    const dispatch = useDispatch();
    const handleNotistack = useNotistack();

    const handleLogin = useCallback(async () => {
        if (!emailConfirm) {
            handleNotistack("이메일을 입력해주세요.", "info");
            emailFocus.current?.focus();
            return;
        } else if (!passwordConfirm) {
            handleNotistack("비밀번호를 입력해주세요.", "info");
            passwordFocus.current?.focus();
            return;
        }
        try {
            const { msg, token } = await requestPostSignin(email, password);
            if (msg === "success") {
                sessionStorage.setItem("user", token);
                dispatch(getUser(token));
                handleNotistack("로그인 되었습니다.", "success");
                history.push(Path.main.index);

            } else {
                handleNotistack(msg, "warning");
            }
        } catch (e) {
            handleNotistack("로그인 도중 오류가 발생했습니다.", "error");
        }
    }, [
        dispatch,
        email,
        emailConfirm,
        handleNotistack,
        history,
        password,
        passwordConfirm,
    ]);
    const handleLoginKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleLogin();
            }
        },
        [handleLogin]
    );

    const JWT_TOKEN: string | null = sessionStorage.getItem("user");
    useEffect(() => {
        if (JWT_TOKEN) {
            history.replace(Path.main.index);
        }
    }, [JWT_TOKEN, history]);
    return (
        <div className="login-container">
            <h1 className="login-title">TweetChallenge</h1>
            <div className="login-wrapper">
                <InputBox
                    type={"email"}
                    name={"email"}
                    value={email}
                    placeholder={"이메일"}
                    onChange={onChangeForm}
                    onKeyDown={handleLoginKeyDown}
                    ref={emailFocus}
                />
                <InputBox
                    type={"password"}
                    name={"password"}
                    value={password}
                    placeholder={"비밀번호"}
                    onChange={onChangeForm}
                    onKeyDown={handleLoginKeyDown}
                    ref={passwordFocus}
                />
                <BasicButton
                    title={"로그인"}
                    onClick={handleLogin}
                    ref={loginFocus}
                />
                <div className={"underline"} />
                <div className="register-wrapper">
                    <Link to={Path.auth.register}>
                        <BasicButton
                            className={"register"}
                            title={"새 계정 만들기"}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginContainer;
