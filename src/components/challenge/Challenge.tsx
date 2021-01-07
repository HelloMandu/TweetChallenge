import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import moment from "moment";
import "moment/locale/ko";

import { ChallengeState } from "../../container/MainContainer";
import LazyImage from "../lazyImage/LazyImage";

import Path, { API_SERVER } from "../../path";

import "./Challenge.scss";

interface ChallengeProps {
    id: string;
    title: string;
    kind: string;
    profile: string;
    start: Date;
    end: Date;
}

const Challenge: React.FC<ChallengeProps> = memo(
    ({ id, title, kind, profile, start, end }) => {
        return (
            <Link to={`${Path.main.detail}/${id}`}>
                <div className="challenge-profile-wrapper">
                    <LazyImage
                        className="challenge-profile"
                        src={`${API_SERVER}/${profile}`}
                        alt="challenge-profile"
                    />
                </div>
                <div className="challenge-title-wrapper">
                    <span className="challenge-kind">{kind}</span>
                    <div className="challenge-title">{title}</div>
                </div>
                <div className="challenge-date-wrapper">
                    <span>기간</span>
                    <div className="challenge-date">
                        <div>
                            {moment(new Date(start)).format("YYYY/MM/DD")}
                        </div>
                        <span>~</span>
                        <div>{moment(new Date(end)).format("YYYY/MM/DD")}</div>
                    </div>
                </div>
            </Link>
        );
    }
);

interface ChallengeListProps {
    challenges: ChallengeState[];
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
    return (
        <ul className="challenge-list">
            {challenges.map(
                ({ id, title, kind, profile, start, end }, index) => (
                    <ButtonBase
                        className="challenge-item"
                        key={index}
                        component="li"
                    >
                        <Challenge
                            id={id}
                            title={title}
                            kind={kind}
                            profile={profile}
                            start={start}
                            end={end}
                        />
                    </ButtonBase>
                )
            )}
        </ul>
    );
};

export default ChallengeList;
