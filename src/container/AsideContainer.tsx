import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store/index";
import { UserState, deleteUser } from "../store/user";
import { toggleAside } from "../store/aside";
import { useScrollEnd } from "../hooks/useScroll";

import AsideWrapper from "../components/aside/AsideWrapper";
import MyChallenges from "../components/aside/MyChallenes";
import Profile from "../components/aside/Profile";
import useNotistack from "../hooks/useNotistack";

const LIMIT: number = 10;

const AsideContainer: React.FC = () => {
    const handleSnackbar = useNotistack();
    const JWT_TOKEN = sessionStorage.getItem("user");
    const dispatch = useDispatch();
    const asideDom = useRef<HTMLDivElement>(null);
    const offAside = useCallback(() => dispatch(toggleAside()), [dispatch]);

    const logout = useCallback(() => {
        offAside();
        dispatch(deleteUser(JWT_TOKEN));
        handleSnackbar('로그아웃 되었습니다.', 'success');
    }, [JWT_TOKEN, dispatch, handleSnackbar, offAside]);

    const user: UserState = useSelector((state: RootState) => state.user);
    const isOn: boolean = useSelector((state: RootState) => state.aside);

    const [challenges, setChallenges] = useState<any[]>([]);
    const OFFSET = useRef<number>(0);
    const handleChallengeList = useCallback(() => {
        if (
            !user.challenges.length ||
            OFFSET.current >= user.challenges.length
        ) {
            return;
        }
        const newChallenges = user.challenges.slice(
            OFFSET.current,
            OFFSET.current + LIMIT
        );
        OFFSET.current += LIMIT;
        if (newChallenges.length) {
            setChallenges(challenges.concat(newChallenges));
        }
    }, [challenges, user.challenges]);
    useEffect(() => {
        if (challenges.length === 0) {
            handleChallengeList();
        }
    }, [challenges.length, handleChallengeList]);
    useScrollEnd(handleChallengeList, asideDom.current);
    return (
        <AsideWrapper isOn={isOn} offAside={offAside} ref={asideDom}>
            <Profile
                user={JWT_TOKEN ? user : null}
                offAside={offAside}
                logout={logout}
            />
            <MyChallenges user={JWT_TOKEN ? user : null} challenges={challenges} offAside={offAside} />
        </AsideWrapper>
    );
};

export default AsideContainer;
