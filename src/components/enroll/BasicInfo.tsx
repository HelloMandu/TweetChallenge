import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from "classnames";
import { ButtonBase } from '@material-ui/core';

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

    const [profile, setProfile] = useState<File | null>(null);
    const onChangeProfile = useCallback((e) => setProfile(e.target.files[0]), []);
    const [imgFile, setImgFile] = useState<string | null>(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (profile) {
            reader.readAsDataURL(profile);
        }
    }, [profile]);
    useEffect(() => textRef.current?.focus(), []);

    // 함수 호출, onClick

    return (
        <main className='enroll-main'>
            <section className='enroll-section'>
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
            <section className='enroll-section'>
                <h3>종류</h3>
                <InputBox
                    type={"text"}
                    name={"kind"}
                    value={kind}
                    placeholder={"종류"}
                    onChange={onChangeForm}
                />
            </section>
            <article className='enroll-section'>
                <section className='enroll-section'>
                    <h3>시작</h3>
                    <DatePicker date={start} onChange={onChangeStart} />
                </section>
                <section className='enroll-section'>
                    <h3>종료</h3>
                    <DatePicker date={end} onChange={onChangeEnd} />
                </section>
            </article>
            <article className='enroll-section'>
                <section className='enroll-section'>
                    <h3>시작시간</h3>
                    <TimePicker time={verifyStart} onChange={onChangeVerifyStart} />
                </section>
                <section className='enroll-section'>
                    <h3>종료시간</h3>
                    <TimePicker time={verifyEnd} onChange={onChangeVerifyEnd} />
                </section>
            </article>
            <section className={cn('enroll-section', 'last-section')}>
                <h3>대표사진</h3>
                <ButtonBase className="enroll-profile-button">
                    <label htmlFor="file-setter">
                        <div className="button-text">
                            <div className="plus">+</div>
                            <div className="plus-text">사진추가</div>
                        </div>
                    </label>
                </ButtonBase>
                <input
                    id="file-setter"
                    className="input-file"
                    type="file"
                    onChange={onChangeProfile}
                    accept="image/gif, image/jpeg, image/png, image/svg"
                />
                {imgFile &&
                    <label className="upload-profile-image" htmlFor="file-setter">
                        <img
                            className={"profile-image"}
                            src={imgFile}
                            alt="profile"
                        />
                    </label>
                }
            </section>
            <BasicButton title={"등록"} />
        </main >
    );
};

export default BasicInfo;