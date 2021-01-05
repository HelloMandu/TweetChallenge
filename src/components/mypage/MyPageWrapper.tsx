import React from "react";
import cn from "classnames";

import "./MyPageWrapper.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

const MyPageWrapper: React.FC = ({ children }) => {
    const aside = useSelector((state: RootState) => state.aside);
    return (
        <div className="mypage-wrapper">
            <div className={cn("aside-margin", { aside })}>{children}</div>
        </div>
    );
};

export default MyPageWrapper;
