import React from 'react';

import './MyPageWrapper.scss';

const MyPageWrapper: React.FC = ({children}) => {
    return(
        <div className="mypage-wrapper">
            {children}
        </div>
    )
}

export default MyPageWrapper;