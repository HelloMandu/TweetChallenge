import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import BasicInfo from "../../components/enroll/BasicInfo";
import EnrollWrapper from "../../components/enroll/EnrollWrapper";

import Path from "../../path";

const EnrollContainer: React.FC = () => {
    //title, kind, start, end, verifyStart, verifyEnd, TOKEN, profile
    const history = useHistory();

    const JWT_TOKEN = sessionStorage.getItem('user');
    useEffect(() => {
        if (!JWT_TOKEN) {
            history.replace(Path.main.index);
        }
    }, [JWT_TOKEN, history]);

    const handleEnroll = useCallback(async (
        title: string,
        kind: string,
        start: Date,
        end: Date,
        verifyStart: Date,
        verifyEnd: Date,
        profile: File | null,
    ) => {
        try {
            // api 통신
        } catch (e) {

        }
    }, []);

    return (
        <EnrollWrapper title="챌린지 등록">
            <BasicInfo handleEnroll={handleEnroll} />
        </EnrollWrapper>
    );
};

export default EnrollContainer;
