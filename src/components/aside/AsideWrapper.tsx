import React from "react";
import cn from 'classnames'
import { API_SERVER } from "../../path";

import "./AsideWrapper.scss";

interface AsideWrapperProps{
    isOn: boolean
}

const AsideWrapper: React.FC<AsideWrapperProps> = ({isOn}) => {
    return (
        <aside className={cn("aside-wrapper", { on: isOn })}>
            <div className={'profile'}>
                <img src={`${API_SERVER}/images/profile.png`} alt="profile" />
                <div>
                    <p className={'profile-name'}>조성민</p>
                    <p className={'profile-email'}>tjdals6695@gmail.com</p>
                </div>
            </div>
            <h2>My Challenges</h2>
            <ul className={"my-challenge-list"}>
                <li className={"my-challenge-item"}>
                    <img
                        className={"challenge-profile"}
                        src={`${API_SERVER}/images/profile.png`}
                        alt="challenge"
                    />
                    <span>아침 08:00시 일어나라</span>
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
