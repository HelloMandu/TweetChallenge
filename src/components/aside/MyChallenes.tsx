import React from "react";
import { API_SERVER } from "../../path";

import './MyChallenges.scss'

interface MyChallengeProps {
    challenges: {
        profile: string;
        description: string;
    }[];
}

const MyChallenges: React.FC<MyChallengeProps> = ({ challenges }) => {
    return (
        <>
            <h2>My Challenges</h2>
            <ul className={"my-challenge-list"}>
                {challenges.map(({ profile, description }, index) => (
                    <li className={"my-challenge-item"} key={index}>
                        <img
                            className={"challenge-profile"}
                            src={`${API_SERVER}/${profile}`}
                            alt="challenge"
                        />
                        <span>{description}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MyChallenges;
