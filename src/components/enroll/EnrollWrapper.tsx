import React from "react";
import cn from "classnames";

import "./EnrollWrapper.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

interface EnrollWrapperProps {
    title?: string;
}

const EnrollWrapper: React.FC<EnrollWrapperProps> = ({ title, children }) => {
    const aside = useSelector((state: RootState) => state.aside);
    return (
        <main className="enroll-wrapper">
            <div className={cn('aside-margin', { aside })}>
                {title && <h1 className="enroll-title">{title}</h1>}
                {children}
            </div>
        </main>
    );
};

export default EnrollWrapper;
