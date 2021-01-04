import React from 'react';

import './MainWrapper.scss';

const MainWrapper: React.FC = ({children}) => {
    return(
        <main className="main-wrapper">
            {children}
        </main>
    )
}

export default MainWrapper;