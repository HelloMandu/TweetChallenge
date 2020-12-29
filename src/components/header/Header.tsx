import React from "react";
import { Link } from "react-router-dom";
import { ButtonBase, IconButton } from "@material-ui/core";

import { UserState } from "../../store/user";
import Path, { API_SERVER } from "../../path";

import MenuIcon from "../../static/asset/MenuIcon";

import "./Header.scss";

interface MenuProps {
    onToggle?: () => void;
}

const Menu: React.FC<MenuProps> = ({ onToggle }) => {
    return (
        <IconButton onClick={onToggle} className={"menu-button"}>
            <MenuIcon />
        </IconButton>
    );
};

interface UserStateProps {
    name: string | null;
    profile: string | null;
}

const AuthState: React.FC<UserStateProps> = ({ name, profile }) => {
    return (
        <Link to={Path.auth.mypage}>
            <ButtonBase className={"my-link"}>
                <img
                    className={"my-image"}
                    src={`${API_SERVER}/${profile}`}
                    alt="profile"
                />
                <span className={"my-name"}>{name}</span>
            </ButtonBase>
        </Link>
    );
};

const AuthLink: React.FC = () => {
    return (
        <div className="auth-link">
            <Link to={Path.auth.login}>
                <ButtonBase className={"login-link"}>로그인</ButtonBase>
            </Link>
            <Link to={Path.auth.register}>
                <ButtonBase className={"register-link"}>회원가입</ButtonBase>
            </Link>
        </div>
    );
};

interface UserProps {
    user: UserState | null;
}

const Header: React.FC<UserProps> = ({ user }) => {
    return (
        <header className={"header"}>
            <div className={"header-wrapper"}>
                <Menu></Menu>
                <h1>TweetChallenge</h1>
                {user ? (
                    <AuthState name={user.name} profile={user.profile} />
                ) : (
                    <AuthLink />
                )}
            </div>
        </header>
    );
};

export default Header;
