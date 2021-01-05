import React from "react";
import { useHistory } from "react-router-dom";
import { Action } from "redux";
import Path, { API_SERVER } from "../../path";
import BasicButton from "../button/BasicButton";

import { UserState } from "../../store/user";

import "./Profile.scss";

interface ProfileProps {
    user: UserState | null;
    offAside: () => Action<any>;
    logout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, offAside, logout }) => {
    const history = useHistory();
    return (
        <div className={"profile-wrapper"}>
            <div
                className={"profile"}
                onClick={() => {
                    history.push(user ? Path.auth.mypage : Path.auth.signin);
                    offAside();
                }}
            >
                <img
                    src={`${API_SERVER}/${
                        user ? user.profile : "images/profile.png"
                    }`}
                    alt="profile"
                />
                {user && (
                    <div>
                        <p className={"profile-text name"}>{user.name}</p>
                        <p className={"profile-text email"}>{user.email}</p>
                    </div>
                )}
            </div>
            {user && (
                <BasicButton
                    className={"aside-logout"}
                    title={"로그아웃"}
                    onClick={logout}
                ></BasicButton>
            )}
        </div>
    );
};

export default Profile;
