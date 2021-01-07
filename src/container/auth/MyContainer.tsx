import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

import MyInfo from '../../components/mypage/MyInfo';
import MyPageWrapper from '../../components/mypage/MyPageWrapper';

const MyContainer: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <MyPageWrapper>
            <MyInfo user={user} />
        </MyPageWrapper>
    );
};

export default MyContainer;
