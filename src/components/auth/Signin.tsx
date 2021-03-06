import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useInput from "../../hooks/useInput";
import useNotistack from "../../hooks/useNotistack";

import Path from "../../path";

import InputBox from "../inputBox/InputBox";
import BasicButton from "../button/BasicButton";

import "./Signin.scss";

interface SigninProps {
    handleSignin: (email: string, password: string) => Promise<void>;
}

const Signin: React.FC<SigninProps> = ({ handleSignin }) => {
    const [form, onChangeForm] = useInput({ email: "", password: "" });
    const { email, password } = form;
    const [emailConfirm, setEmailConfirm] = useState<boolean>(false);
    const [passwordConfirm, setPasswordConfirm] = useState<boolean>(false);
    const emailFocus = useRef<HTMLInputElement>(null);
    const passwordFocus = useRef<HTMLInputElement>(null);
    const loginFocus = useRef<HTMLButtonElement>(null);

    useEffect(() => emailFocus.current?.focus(), []);
    useEffect(() => setEmailConfirm(email.length > 0), [email]);
    useEffect(() => setPasswordConfirm(password.length > 0), [password]);

    const handleNotistack = useNotistack();

    const onClickLogin = useCallback(() => {
        if (!emailConfirm) {
            handleNotistack("이메일을 입력해주세요.", "info");
            emailFocus.current?.focus();
            return;
        } else if (!passwordConfirm) {
            handleNotistack("비밀번호를 입력해주세요.", "info");
            passwordFocus.current?.focus();
            return;
        }
        handleSignin(email, password);
    }, [
        email,
        emailConfirm,
        handleSignin,
        handleNotistack,
        password,
        passwordConfirm,
    ]);
    const onKeyDownLogin = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                onClickLogin();
            }
        },
        [onClickLogin]
    );
    return (
        <form className="signin-wrapper">
            <InputBox
                type={"email"}
                name={"email"}
                value={email}
                placeholder={"이메일"}
                onChange={onChangeForm}
                onKeyDown={onKeyDownLogin}
                ref={emailFocus}
            />
            <InputBox
                type={"password"}
                name={"password"}
                value={password}
                placeholder={"비밀번호"}
                onChange={onChangeForm}
                onKeyDown={onKeyDownLogin}
                ref={passwordFocus}
            />
            <BasicButton
                title={"로그인"}
                onClick={onClickLogin}
                ref={loginFocus}
            />
            <div className={"underline"} />
            <div className="signup-button">
                <Link to={Path.auth.signup}>
                    <BasicButton
                        className={"register"}
                        title={"새 계정 만들기"}
                    />
                </Link>
            </div>
        </form>
    );
};

export default Signin;
