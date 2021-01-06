import React from "react";
import cn from "classnames";

import "./AuthWrapper.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

interface AuthWrapperProps {
    title?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ title, children }) => {
    const aside = useSelector((state: RootState) => state.aside);
    return (
        <div className="auth-wrapper">
            <div className={cn("aside-margin", { aside })}>
                {title && <h1 className="auth-title">{title}</h1>}
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;
