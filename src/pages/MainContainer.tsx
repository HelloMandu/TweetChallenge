import React, { useState, useEffect, useRef } from "react";

import { requestGetChallenges } from "../api/challenge";
import useNotistack from "../hooks/useNotistack";
import useLoading from "../hooks/useLoading";

import MainWrapper from "../components/main/MainWrapper";
import ChallengeList from "../components/main/Challenge";
import MainSkeleton from "../components/skeleton/MainSkeleton";

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
const LIMIT: number = 8;

const MainContainer: React.FC = () => {
    const handleSnackbar = useNotistack();
    const [isLoading, onLoading, offLoading] = useLoading("main");
    const offset = useRef<number>(0);
    const [challenges, setChallenges] = useState<ChallengeState[]>([]);
    // const [isFinish, setIsFinish] = useState<boolean>(false);
    useEffect(() => {
        const getChallenges = async () => {
            onLoading();
            try {
                const {
                    msg,
                    challenges: newChallenges,
                } = await requestGetChallenges(offset.current);

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
                if (msg === "success") {
                    setChallenges((challenge) =>
                        challenge.concat(newChallengeList)
                    );
                    offset.current += LIMIT;
                } else if (msg === "finish") {
                    // setIsFinish(true);
                }
            } catch (e) {
                handleSnackbar("네트워크 상태를 확인하세요", "error");
            }
            setTimeout(offLoading, 1000);
        };
        getChallenges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => console.log(challenges), [challenges]);
    return (
        <MainWrapper>
            {isLoading ? (
                <MainSkeleton />
            ) : (
                <ChallengeList challenges={challenges} />
            )}
        </MainWrapper>
    );
};

export default MainContainer;
