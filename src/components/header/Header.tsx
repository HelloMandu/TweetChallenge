import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import Path, { API_SERVER } from '../../path';
import { UserState } from '../../store/user';
import { useLogout } from '../../hooks/useAuth';

import Menu from './Menu';

import './Header.scss';

interface UserStateProps {
    name: string | null;
    profile: string | null;
}

const AuthState: React.FC<UserStateProps> = ({ name, profile }) => {
    const history = useHistory();
    const [clicked, setClicked] = useState<boolean>(false);
    const toggleClicked = useCallback(() => setClicked((clicked) => !clicked), []);
    const handleLogout = useLogout();
    const onClickLogout = useCallback(() => {
        const JWT_TOKEN = sessionStorage.getItem('user');
        if (JWT_TOKEN) {
            handleLogout(JWT_TOKEN);
        }
    }, [handleLogout]);
    return (
        <div className={'my-link-wrapper'} >
            <ButtonBase className={'my-link'} onClick={toggleClicked}>
                <img className={'my-image'} src={`${API_SERVER}/${profile}`} alt="profile" />
                <span className={'my-name'}>{name}</span>
            </ButtonBase>
            <div className={cn('my-link-tooltip', { clicked })} onBlur={() => setClicked(false)}>
                <ButtonBase
                    className={'tooltip-button'}
                    onClick={() => {
                        history.push(Path.main.enroll);
                        setClicked(false)
                    }}
                >
                    등록하기
                </ButtonBase>
                <ButtonBase
                    className={'tooltip-button'}
                    onClick={() => {
                        history.push(Path.auth.mypage);
                        setClicked(false)
                    }}
                >
                    마이페이지
                </ButtonBase>
                <ButtonBase className={'tooltip-button'} onClick={onClickLogout}>
                    로그아웃
                </ButtonBase>
            </div>
        </div>
    );
};

const AuthLink: React.FC = () => {
    return (
        <div className="auth-link">
            <Link to={Path.auth.signin}>
                <ButtonBase className={'login-link'}>로그인</ButtonBase>
            </Link>
            <Link to={Path.auth.signup}>
                <ButtonBase className={'register-link'}>회원가입</ButtonBase>
            </Link>
        </div>
    );
};

interface HeaderProps {
    user: UserState | null;
    toggleAside: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, toggleAside }) => {
    return (
        <header className={'header'}>
            <div className={'header-wrapper'}>
                <h1>
                    <Link to={Path.main.index}>TweetChallenge</Link>
                </h1>
                <Menu onToggle={toggleAside}></Menu>
                {user ? <AuthState name={user.name} profile={user.profile} /> : <AuthLink />}
            </div>
        </header>
    );
};

export default Header;
