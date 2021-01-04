import React from "react";
import { API_SERVER } from "../../path";
import moment from "moment";
import "moment/locale/ko";
import { ChallengeState } from "../../pages/MainContainer";
import { ButtonBase } from "@material-ui/core";

interface ChallengeProps {
    title: string;
    kind: string;
    profile: string;
    start: Date;
    end: Date;
}

const Challenge: React.FC<ChallengeProps> = ({
    title,
    kind,
    profile,
    start,
    end,
}) => {
    return (
        <ButtonBase className="challenge-content" component="div">
            <div className="challenge-profile-wrapper">
                <img
                    src={`${API_SERVER}/${profile}`}
                    alt="challenge-profile"
                    className="challenge-profile"
                />
            </div>
            <div className="challenge-title-wrapper">
                <span className="challenge-kind">{kind}</span>
                <div className="challenge-title">{title}</div>
            </div>
            <div className="challenge-date-wrapper">
                <span>기간</span>
                <div className="challenge-date">
                    <div>{moment(new Date(start)).format("YYYY/MM/DD")}</div>
                    <span>~</span>
                    <div>{moment(new Date(end)).format("YYYY/MM/DD")}</div>
                </div>
            </div>
        </ButtonBase>
    );
};

interface ChallengeListProps {
    challenges: ChallengeState[];
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
    return (
        <ul className="challenge-list">
            {challenges.map(({ id, title, kind, profile, start, end }) => (
                <li className="challenge-item" key={id}>
                    <Challenge
                        title={title}
                        kind={kind}
                        profile={profile}
                        start={start}
                        end={end}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ChallengeList;
