import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from "classnames";
import { ButtonBase } from '@material-ui/core';

import useInput from '../../hooks/useInput';
import useNotistack from '../../hooks/useNotistack';

import BasicButton from '../button/BasicButton';
import DatePicker from '../datepicker/DatePicker';
import InputBox from '../inputBox/InputBox';
import TimePicker from '../timepicker/TimePicker';

import './BasicInfo.scss';
import { useHistory } from 'react-router-dom';
import Path from '../../path';

interface BasicInfoProps {
    handleEnroll: (JWT_TOKEN: string, description: string, title: string, kind: string, start: Date, end: Date, verifyStart: Date, verifyEnd: Date, profile: File) => Promise<void>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ handleEnroll }) => {

    const [form, onChangeForm] = useInput({ title: "", kind: "", description: "" });
    const { title, description, kind } = form;
    const [start, onChangeStart] = useInput({ year: new Date().getFullYear(), month: 1, day: 1, });
    const [end, onChangeEnd] = useInput({ year: new Date().getFullYear(), month: 1, day: 1, });
    const [verifyStart, onChangeVerifyStart] = useInput({ hour: 0, minute: 0, });
    const [verifyEnd, onChangeVerifyEnd] = useInput({ hour: 0, minute: 0, });

    const handleNotistack = useNotistack();

    const titleRef = useRef<HTMLInputElement>(null);
    const kindRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

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
    useEffect(() => titleRef.current?.focus(), []);

    const history = useHistory();

    const JWT_TOKEN = sessionStorage.getItem('user');
    useEffect(() => {
        if (!JWT_TOKEN) {
            history.replace(Path.main.index);
        }
    }, [JWT_TOKEN, history]);

    const onClickEnroll = useCallback(() => {
        if (title === '') {
            handleNotistack("제목을 입력해주세요.", 'info');
            titleRef.current?.focus();
            return;
        } else if (description === '') {
            handleNotistack("설명을 입력해주세요.", 'info');
            description.current?.focus();
            return;
        } else if (kind === '') {
            handleNotistack("종류를 입력해주세요.", 'info');
            kindRef.current?.focus();
            return;
        } else if (!profile) {
            handleNotistack("대표사진을 입력해주세요", "info");
            return;
        }
        const { year: start_year, month: start_month, day: start_day } = start;
        const { year: end_year, month: end_month, day: end_day } = end;
        const { hour: start_hour, minute: start_minute } = verifyStart;
        const { hour: end_hour, minute: end_minute } = verifyEnd;
        handleEnroll(
            JWT_TOKEN!,
            title,
            description,
            kind,
            new Date(`${start_year}/${start_month}/${start_day}`),
            new Date(`${end_year}/${end_month}/${end_day}`),
            new Date(`${start_year}/${start_month}/${start_day} ${start_hour}:${start_minute}`),
            new Date(`${end_year}/${end_month}/${end_day} ${end_hour}:${end_minute}`),
            profile
        );
    }, [handleEnroll, handleNotistack, JWT_TOKEN, title, description, kind, start, end, verifyStart, verifyEnd, profile]);

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
                    ref={titleRef}
                />
            </section>
            <section className='enroll-section'>
                <h3>설명</h3>
                <InputBox
                    type={"text"}
                    name={"description"}
                    value={description}
                    placeholder={"설명"}
                    onChange={onChangeForm}
                    ref={descriptionRef}
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
                    ref={kindRef}
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
            <BasicButton title={"등록"} onClick={onClickEnroll} />
        </main >
    );
};

export default BasicInfo;