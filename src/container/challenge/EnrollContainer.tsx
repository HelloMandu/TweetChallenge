import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import BasicInfo from "../../components/enroll/BasicInfo";
import EnrollWrapper from "../../components/enroll/EnrollWrapper";

import useNotistack from '../../hooks/useNotistack';

import { requestPostEnroll } from "../../api/challenge";
import Path from "../../path";

const EnrollContainer: React.FC = () => {

    const handleNotistack = useNotistack();
    const history = useHistory();

    const handleEnroll = useCallback(async (
        JWT_TOKEN: string,
        title: string,
        description: string,
        kind: string,
        start: Date,
        end: Date,
        verifyStart: Date,
        verifyEnd: Date,
        profile: File,
    ) => {
        try {
            const { msg } = await requestPostEnroll(JWT_TOKEN, title, description, kind, start, end, verifyStart, verifyEnd, profile);
            if (msg === 'success') {
                handleNotistack("등록이 완료되었습니다..", "success");
                history.push(Path.main.index);
            } else {
                handleNotistack(msg, "warning");
            }
        } catch (e) {
            handleNotistack(
                "등록 도중 오류가 발생하였습니다.",
                "error"
            );
        }
        //react-hooks/exhaustive-deps
    }, [handleNotistack, history]);

    return (
        <EnrollWrapper title="챌린지 등록">
            <BasicInfo handleEnroll={handleEnroll} />
        </EnrollWrapper>
    );
};

export default EnrollContainer;
