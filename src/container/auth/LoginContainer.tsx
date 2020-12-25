import React from "react";
import { Link } from "react-router-dom";

import path from "../../path";

import useInput from "../../hooks/useInput";

import InputBox from "../../components/inputBox/InputBox";
import BasicButton from "../../components/button/BasicButton";

import "./LoginContainer.scss";

const LoginContainer: React.FC = () => {
    const [form, onChangeForm] = useInput({ email: "", password: "" });
    return (
        <div className="login-container">
            <h1 className="login-title">TweetChallenge</h1>
            <div className="login-wrapper">
                <InputBox
                    type={"email"}
                    name={"email"}
                    value={form.email}
                    placeholder={"이메일"}
                    onChange={onChangeForm}
                />
                <InputBox
                    type={"password"}
                    name={"password"}
                    value={form.password}
                    placeholder={"비밀번호"}
                    onChange={onChangeForm}
                />
                <BasicButton title={"로그인"} />
                <div className={"underline"} />
                <div className="register-wrapper">
                    <Link to={path.auth.register}>
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
