import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { requestGetChallengeDetail } from '../../api/challenge';
import Detail, { DetailProps } from '../../components/detail/Detail';
import DetailWrapper from '../../components/detail/DetailWrapper';

interface MatchParams {
    id: string;
}

const DetailContainer: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [data, setData] = useState<DetailProps>({ challenge: null });
    useEffect(() => {
        const getChallengeDetail = async () => {
            if (match) {
                const { msg, challenge } = await requestGetChallengeDetail(match.params.id);
                if (msg === 'success') {
                    const {
                        profile,
                        title,
                        start,
                        end,
                        description,
                        verifyStart,
                        verifyEnd,
                        kind,
                        participate,
                    } = challenge;
                    setData({
                        challenge: {
                            profile,
                            title,
                            start,
                            end,
                            description,
                            verifyStart,
                            verifyEnd,
                            kind,
                            participate,
                        },
                    });
                } else {
                }
            }
        };
        getChallengeDetail();
    }, [match]);
    return (
        <DetailWrapper>
            <Detail challenge={data.challenge} />
        </DetailWrapper>
    );
};

export default DetailContainer;
