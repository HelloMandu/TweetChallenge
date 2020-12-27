import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";

import { requestPostRegister } from '../../api/user';
import Path from "../../path";

import useInput from "../../hooks/useInput";
import useNotistack from "../../hooks/useNotistack";
import { isEmailForm, isPasswordForm } from "../../lib/formatCheck";

import BasicButton from "../../components/button/BasicButton";
import InputBox from "../../components/inputBox/InputBox";
import DatePicker from "../../components/datepicker/DatePicker";

import "./RegisterContainer.scss";

const RegisterContainer: React.FC = () => {
    const handleNotistack = useNotistack();
    const history = useHistory();
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

    const [formConfirm, setFormConfirm] = useState<boolean>(false);
    useEffect(()=>setFormConfirm(emailStatus && passwordForm && samePassword), [emailStatus, passwordForm, samePassword])

    const [birth, onChangebirth] = useInput({
        year: new Date().getFullYear(),
        month: 1,
        day: 1,
    });
    const handleRegister = useCallback(async () => {
        if(!formConfirm){
            handleNotistack('입력 양식을 맞춰주세요.', 'info');
            return;
        }
        const {year, month, day} = birth;
        try{
            const response = await requestPostRegister(name, email, password, new Date(`${year}/${month}/${day}`));
            const { msg } = response;
            if(msg === 'success'){
                    handleNotistack('회원가입되었습니다.', 'success');
                    history.push(Path.auth.login);
            } else{
                handleNotistack(msg, 'warning');
            }
        } catch(e){
            handleNotistack('회원가입 도중 오류가 발생하였습니다.', 'error');
        }
    }, [birth, email, formConfirm, handleNotistack, history, name, password]);
    const onKeyDownRegister = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleRegister();
            }
        },
        [handleRegister]
    );
    
    const focusing = useRef<HTMLInputElement>(null);
    useEffect(() => focusing.current?.focus(), []);
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
                            active: password.length,
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
                            active: passwordForm && passwordConfirm.length,
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
