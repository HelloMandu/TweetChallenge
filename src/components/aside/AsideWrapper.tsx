import React from "react";
import cn from "classnames";

import "./AsideWrapper.scss";

interface AsideWrapperProps {
    isOn: boolean;
}

const AsideWrapper: React.FC<AsideWrapperProps> = ({ isOn, children }) => {
    return (
        <aside className={cn("aside-wrapper", { on: isOn })}>{children}</aside>
    );
};

export default AsideWrapper;
