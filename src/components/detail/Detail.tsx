import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

import Path, { API_SERVER } from '../../path';
import LazyImage from '../lazyImage/LazyImage';
import BasicButton from '../button/BasicButton';

import './Detail.scss';
import { ButtonBase } from '@material-ui/core';

export interface DetailProps {
    challenge: {
        profile: string;
        title: string;
        start: Date;
        end: Date;
        description: string;
        verifyStart: Date;
        verifyEnd: Date;
        kind: string;
        participate: any[];
        user: string;
    } | null;
    writer: boolean | null;
}

const Detail: React.FC<DetailProps> = ({ challenge, writer }) => {
    if (!challenge) {
        return <h1>스켈레톤</h1>;
    }
    const {
        profile,
        title,
        start,
        end,
        description,
        verifyStart,
        verifyEnd,
        kind,
        participate,
    } = challenge;
    // 새로고침시 수정
    return (
        <>
            <section className="detail-content">
                <div className="detail-profile-wrapper">
                    <LazyImage src={`${API_SERVER}/${profile}`} alt="profile" />
                </div>
                <div className="detail-content-wrapper">
                    <div className="detail-title-wrapper">
                        <span className="detail-kind">{kind}</span>
                        <h1 className="detail-title">{title}</h1>
                    </div>
                    <div className="detail-info">
                        <span>참가인원</span>
                        <span className="detail-participate">{participate.length}명</span>
                    </div>
                    <div className="detail-info">
                        <span>기간</span>
                        <div className="detail-challenge-date">
                            <div>{moment(new Date(start)).format('YYYY/MM/DD')}</div>
                            <span>~</span>
                            <div>{moment(new Date(end)).format('YYYY/MM/DD')}</div>
                        </div>
                    </div>
                    <div className="detail-info">
                        <span>인증시간</span>
                        <div className="detail-challenge-date">
                            <div>{moment(new Date(verifyStart)).format('MM:DD')}</div>
                            <span>~</span>
                            <div>{moment(new Date(verifyEnd)).format('MM:DD')}</div>
                        </div>
                    </div>
                    <div className="detail-info">
                        <p className="detail-description">{description}</p>
                    </div>
                </div>
            </section>
            <div className="participate-button-wrapper">
                <BasicButton title="참가하기"></BasicButton>
            </div>
            {writer &&
                <Link to={{ pathname: Path.main.enroll, state: challenge }} className="participate-button-wrapper">
                    <ButtonBase component="div" className="modify-button" >
                        <div>수정하기</div>
                    </ButtonBase>
                </Link>
            }
        </>
    );
};

export default Detail;
