import React from 'react';

import './Skeleton.scss';

const Skeleton: React.FC = () =>{
    return(
        <div className="skeleton-wrapper">
            <div className="screen"></div>
            <div className="text"></div>
            <div className="text"></div>
        </div>
    )
}

export default Skeleton;