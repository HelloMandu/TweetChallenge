import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../store/index';
import { requestGetChallengeDetail } from '../../api/challenge';
import Detail, { DetailProps } from '../../components/detail/Detail';
import DetailWrapper from '../../components/detail/DetailWrapper';

interface MatchParams {
    id: string;
}

const DetailContainer: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [data, setData] = useState<DetailProps>({ challenge: null, writer: null });
    const reduxUser = useSelector((state: RootState) => state.user);
    useEffect(() => {
        const getChallengeDetail = async () => {
            if (match) {
                const { msg, challenge } = await requestGetChallengeDetail(match.params.id);
                if (msg === 'success') {
                    const { profile, title, start, end, description, verifyStart, verifyEnd, kind, participate, user, } = challenge;
                    if (reduxUser.id === user) {
                        setData({
                            challenge: { profile, title, start, end, description, verifyStart, verifyEnd, kind, participate, user, },
                            writer: true,
                        });
                    } else {
                        setData({
                            challenge: { profile, title, start, end, description, verifyStart, verifyEnd, kind, participate, user, },
                            writer: false,
                        });
                    }
                } else {
                }
            }
        };
        getChallengeDetail();
        // eslint-disable-next-line 
    }, [match]);
    return (
        <DetailWrapper>
            <Detail challenge={data.challenge} writer={data.writer} />
        </DetailWrapper>
    );
};

export default DetailContainer;
