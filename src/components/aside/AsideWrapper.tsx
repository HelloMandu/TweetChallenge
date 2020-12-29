import React from "react";
import { API_SERVER } from "../../path";

import "./AsideWrapper.scss";

const AsideWrapper: React.FC = () => {
    return (
        <aside className={"aside-wrapper"}>
            <div className={'profile'}>
                <img src={`${API_SERVER}/images/profile.png`} alt="profile" />
                <div>
                    <div className={'profile-name'}>조성민</div>
                    <div className={'profile-email'}>tjdals6695@gmail.com</div>
                </div>
            </div>
            <h2>My Challenge</h2>
            <ul className={"my-challenge-list"}>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나기</span>
                </li>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나기</span>
                </li>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나기</span>
                </li>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나기</span>
                </li>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나기</span>
                </li>
            </ul>
        </aside>
    );
};

export default AsideWrapper;
