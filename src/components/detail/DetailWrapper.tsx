import React from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import "./DetailWrapper.scss";

const DetailWrapper: React.FC = ({ children }) => {
    const aside = useSelector((state: RootState) => state.aside);
    return (
        <div className="detail-wrapper">
            <div className={cn("aside-margin", { aside })}>{children}</div>
        </div>
    );
};

export default DetailWrapper;
