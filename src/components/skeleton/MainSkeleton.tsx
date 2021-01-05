import React from "react";
import Skeleton from "./Skeleton";

import "./MainSkeleton.scss";

const MainSkeleton: React.FC = () => {
    return (
        <div className={"main-skeleton-wrapper"}>
            {[...Array(12)].map((x, index) => (
                <div className={"main-skeleton-item"} key={index}>
                    <Skeleton />
                </div>
            ))}
        </div>
    );
};

export default MainSkeleton;
