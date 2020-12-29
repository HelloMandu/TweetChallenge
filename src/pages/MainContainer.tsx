import React from "react";
import AsideWrapper from "../components/aside/AsideWrapper";
import HeaderContainer from "../container/HeaderContainer";

const MainContainer: React.FC = () => {
    return (
        <div>
            <HeaderContainer/>
            <AsideWrapper/>
        </div>
    );
};

export default MainContainer;
