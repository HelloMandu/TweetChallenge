import React from "react";
import { Link } from "react-router-dom";
import { Action } from "redux";
import { UserState } from "../../store/user";
import Path, { API_SERVER } from "../../path";
import LazyImage from "../lazyImage/LazyImage";

import "./MyChallenges.scss";

interface MyChallengeProps {
    user: UserState | null;
    challenges: any[];
    offAside: () => Action<any>;
}

const MyChallenges: React.FC<MyChallengeProps> = ({ user, challenges, offAside }) => {
    return (
        <>
            <h2>My Challenges</h2>
            {user ? (
                challenges.length ? (
                    <ul className={"my-challenge-list"}>
                        {challenges.map(
                            ({ _id: id, profile, title }, index) => (
                                <li
                                    className={"my-challenge-item"}
                                    key={index}
                                    onClick={offAside}
                                >
                                    <Link
                                        className={"my-challenge-link"}
                                        to={`${Path.main.detail}/${id}`}
                                    >
                                        <LazyImage
                                            className={"challenge-profile"}
                                            src={`${API_SERVER}/${profile}`}
                                            alt="challenge"
                                        />
                                        <span className={"my-challenge-title"}>
                                            {title}
                                        </span>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <p className={"challenge-text"}>등록된 챌린지가 없습니다</p>
                )
            ) : (
                <p className={"challenge-text"}>로그인 후 이용해 주세요</p>
            )}
        </>
    );
};

export default MyChallenges;
