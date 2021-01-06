import React from "react";
import cn from "classnames";

import "./MainWrapper.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

const MainWrapper: React.FC = ({ children }) => {
    const aside = useSelector((state: RootState) => state.aside);
    return (
        <main className="main-wrapper">
            <div className={cn('aside-margin', { aside })}>{children}</div>
        </main>
    );
};

export default MainWrapper;
