import React, { useState, useEffect, useRef, useCallback } from 'react';

import { requestGetChallenges } from '../api/challenge';
import useNotistack from '../hooks/useNotistack';
import useLoading from '../hooks/useLoading';
import { useScrollEnd } from '../hooks/useScroll';

import MainWrapper from '../components/main/MainWrapper';
import ChallengeList from '../components/challenge/Challenge';
import MainSkeleton from '../components/skeleton/MainSkeleton';

export interface ChallengeState {
    id: string;
    title: string;
    kind: string;
    start: Date;
    end: Date;
    verifyStart: Date;
    verifyEnd: Date;
    profile: string;
    user: string;
}
const LIMIT: number = 12;

const MainContainer: React.FC = () => {
    const handleSnackbar = useNotistack();
    const [mounted, setMounted] = useState<boolean>(false);
    const [isLoading, onLoading, offLoading] = useLoading('main');
    const offset = useRef<number>(0);
    const [challenges, setChallenges] = useState<ChallengeState[]>([]);
    const isFinish = useRef<boolean>(false);
    const getChallenges = useCallback(async () => {
        if (isFinish.current) {
            return;
        }
        onLoading();
        try {
            const { msg, challenges: newChallenges } = await requestGetChallenges(offset.current);
            if (msg === 'success') {
                const newChallengeList: ChallengeState[] = newChallenges.map(
                    ({
                        _id,
                        title,
                        kind,
                        start,
                        end,
                        verifyStart,
                        verifyEnd,
                        profile,
                        user,
                    }: any) => ({
                        id: _id,
                        title,
                        kind,
                        start,
                        end,
                        verifyStart,
                        verifyEnd,
                        profile,
                        user,
                    })
                );
                setChallenges((challenge) => challenge.concat(newChallengeList));
                offset.current += LIMIT;
            } else if (msg === 'finish') {
                isFinish.current = true;
            }
        } catch (e) {
            handleSnackbar('네트워크 상태를 확인하세요', 'error');
        }
        offLoading();
        setTimeout(() => setMounted(true), 1000);
    }, [handleSnackbar, isFinish, offLoading, onLoading]);
    useScrollEnd(getChallenges);
    useEffect(() => {
        getChallenges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <MainWrapper>
            {!mounted ? <MainSkeleton /> : <ChallengeList challenges={challenges} />}
        </MainWrapper>
    );
};

export default MainContainer;
