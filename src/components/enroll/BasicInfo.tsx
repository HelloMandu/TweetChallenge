import React, { useEffect, useRef } from 'react';

import useInput from '../../hooks/useInput';

import BasicButton from '../button/BasicButton';
import DatePicker from '../datepicker/DatePicker';
import InputBox from '../inputBox/InputBox';
import TimePicker from '../timepicker/TimePicker';
import './BasicInfo.scss';

interface BasicInfoProps {
    handleEnroll: (title: string, kind: string, start: Date, end: Date, verifyStart: Date, verifyEnd: Date, profile: File | null) => Promise<void>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ handleEnroll }) => {

    const [form, onChangeForm] = useInput({ title: "", kind: "" });
    const { title, kind } = form;
    const [start, onChangeStart] = useInput({ year: new Date().getFullYear(), month: 1, day: 1, });
    const [end, onChangeEnd] = useInput({ year: new Date().getFullYear(), month: 1, day: 1, });
    const [verifyStart, onChangeVerifyStart] = useInput({ hour: 0, minute: 0, });
    const [verifyEnd, onChangeVerifyEnd] = useInput({ hour: 0, minute: 0, });

    const textRef = useRef<HTMLInputElement>(null);
    const kindRef = useRef<HTMLInputElement>(null);

    useEffect(() => textRef.current?.focus(), []);

    // keydown, onClick, api 호출, 디자인, profile(?) 이미지

    return (
        <article>
            <section>
                <h3>제목</h3>
                <InputBox
                    type={"text"}
                    name={"title"}
                    value={title}
                    placeholder={"제목"}
                    onChange={onChangeForm}
                    ref={textRef}
                />
            </section>
            <section>
                <h3>종류</h3>
                <InputBox
                    type={"text"}
                    name={"kind"}
                    value={kind}
                    placeholder={"종류"}
                    onChange={onChangeForm}
                    ref={kindRef}
                />
            </section>
            <section>
                <div>
                    <h3>시작</h3>
                    <DatePicker date={start} onChange={onChangeStart} />
                </div>
                <div>
                    <h3>종료</h3>
                    <DatePicker date={end} onChange={onChangeEnd} />
                </div>
            </section>
            <section>
                <div>
                    <h3>시작시간</h3>
                    <TimePicker time={verifyStart} onChange={onChangeVerifyStart} />
                </div>
                <div>
                    <h3>종료시간</h3>
                    <TimePicker time={verifyEnd} onChange={onChangeVerifyEnd} />
                </div>
            </section>
            <BasicButton title={"등록"} />
        </article>
    );
};

export default BasicInfo;