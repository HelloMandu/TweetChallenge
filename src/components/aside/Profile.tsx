import React from "react";
import { useHistory } from "react-router-dom";
import Path, { API_SERVER } from "../../path";

import { UserState } from "../../store/user";

import "./Profile.scss";

interface ProfileProps {
    user: UserState | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const history = useHistory();
    return (
        <div className={"profile-wrapper"}>
            <div
                className={"profile"}
                onClick={() =>
                    history.push(user ? Path.auth.mypage : Path.auth.signin)
                }
            >
                <img
                    src={`${API_SERVER}/${
                        user ? user.profile : "images/profile.png"
                    }`}
                    alt="profile"
                />
                {user ? (
                    <div>
                        <p className={"profile-text name"}>{user.name}</p>
                        <p className={"profile-text email"}>{user.email}</p>
                    </div>
                ) : (
                    <p className={"profile-text"}>로그인 후 이용해 주세요</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
