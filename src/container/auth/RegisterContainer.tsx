import React, { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";

import useInput from "../../hooks/useInput";
import { isEmailForm, isPasswordForm } from "../../lib/formatCheck";

import BasicButton from "../../components/button/BasicButton";
import InputBox from "../../components/inputBox/InputBox";
import DatePicker from "../../components/datepicker/DatePicker";

import "./RegisterContainer.scss";

const RegisterContainer: React.FC = () => {
    const [form, onChangeForm] = useInput({
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
    });
    const { email, name, password, passwordConfirm } = form;

    const [emailStatus, setEmailStatus] = useState<boolean>(false);
    useEffect(() => setEmailStatus(isEmailForm(email)), [email]);

    const [passwordForm, setPasswordForm] = useState<boolean>(false);
    const [samePassword, setSamePassword] = useState<boolean>(false);
    useEffect(() => setPasswordForm(isPasswordForm(password)), [password]);
    useEffect(() => setSamePassword(password === passwordConfirm), [
        password,
        passwordConfirm,
    ]);

    const focusing = useRef<HTMLInputElement>(null);
    useEffect(() => focusing.current?.focus(), []);

    const [birth, onChangebirth] = useInput({
        year: new Date().getFullYear(),
        month: 1,
        day: 1,
    });
    const handleRegister = useCallback(() => {
        console.log("가입하기");
    }, []);
    const onKeyDownRegister = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleRegister();
            }
        },
        [handleRegister]
    );
    return (
        <div className="register-container">
            <h1 className="register-title">회원가입</h1>
            <div className="register-wrapper">
                <section>
                    <h3>이름</h3>
                    <InputBox
                        type={"text"}
                        name={"name"}
                        value={name}
                        placeholder={"이름을 입력해주세요."}
                        onChange={onChangeForm}
                        onKeyDown={onKeyDownRegister}
                        ref={focusing}
                    />
                </section>
                <section>
                    <h3>이메일</h3>
                    <InputBox
                        type={"email"}
                        name={"email"}
                        value={email}
                        placeholder={"이메일을 입력해주세요."}
                        onChange={onChangeForm}
                        onKeyDown={onKeyDownRegister}
                    />
                    <p
                        className={cn("alert", {
                            active: email.length,
                            failed: !emailStatus,
                            confirm: emailStatus,
                        })}
                    >
                        {emailStatus
                            ? "사용가능한 이메일 입니다."
                            : "이메일 형식에 맞지 않습니다"}
                    </p>
                </section>
                <section>
                    <h3>비밀번호</h3>
                    <InputBox
                        type={"password"}
                        name={"password"}
                        value={password}
                        placeholder={"비밀번호를 입력해주세요."}
                        onChange={onChangeForm}
                        onKeyDown={onKeyDownRegister}
                    />
                    <p
                        className={cn("alert", {
                            active: password.length && !passwordConfirm.length,
                            failed: !passwordForm,
                            confirm: passwordForm,
                        })}
                    >
                        {passwordForm
                            ? "사용가능한 비밀번호 입니다."
                            : "비밀번호 형식에 맞지 않습니다."}
                    </p>
                    <InputBox
                        type={"password"}
                        name={"passwordConfirm"}
                        value={passwordConfirm}
                        placeholder={"비밀번호를 재입력해주세요."}
                        onChange={onChangeForm}
                        onKeyDown={onKeyDownRegister}
                    />
                    <p
                        className={cn("alert", {
                            active: passwordConfirm.length,
                            failed: !samePassword,
                            confirm: samePassword,
                        })}
                    >
                        {samePassword
                            ? "비밀번호가 일치합니다."
                            : "비밀번호가 일치하지 않습니다."}
                    </p>
                </section>
                <section className="birth">
                    <h3>생년월일</h3>
                    <DatePicker date={birth} onChange={onChangebirth} />
                </section>
                <div className="signup-wrapper">
                    <BasicButton
                        className={"signup"}
                        title={"가입하기"}
                        onClick={handleRegister}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterContainer;
