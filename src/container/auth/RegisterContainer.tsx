import React from "react";

import useInput from "../../hooks/useInput";

import BasicButton from "../../components/button/BasicButton";
import InputBox from "../../components/inputBox/InputBox";
import DatePicker from '../../components/datepicker/DatePicker'

import "./RegisterContainer.scss";

const RegisterContainer: React.FC = () => {
    const [form, onChangeForm] = useInput({
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
    });
    const { email, name, password, passwordConfirm } = form;
    const [birth, onChangebirth] = useInput({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    });
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <h1 className="register-title">회원가입</h1>
                <section>
                    <h3>이름</h3>
                    <InputBox
                        type={"text"}
                        name={"name"}
                        value={name}
                        placeholder={"이름을 입력해주세요."}
                        onChange={onChangeForm}
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
                    />
                </section>
                <section>
                    <h3>비밀번호</h3>
                    <InputBox
                        type={"password"}
                        name={"password"}
                        value={password}
                        placeholder={"비밀번호를 입력해주세요."}
                        onChange={onChangeForm}
                    />
                    <InputBox
                        type={"password"}
                        name={"passwordConfirm"}
                        value={passwordConfirm}
                        placeholder={"비밀번호를 재입력해주세요."}
                        onChange={onChangeForm}
                    />
                </section>
                <section className="birth">
                    <h3>생년월일</h3>
                    <DatePicker date={birth} onChange={onChangebirth} />
                </section>
                <div className="signup-wrapper">
                    <BasicButton className={"signup"} title={"가입하기"} />
                </div>
            </div>
        </div>
    );
};

export default RegisterContainer;
