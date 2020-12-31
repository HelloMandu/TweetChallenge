import React from "react";
import AsideWrapper from "../components/aside/AsideWrapper";

interface AsideContainerProps{
    isOn: boolean
}

const AsideContainer: React.FC<AsideContainerProps> = ({isOn}) => {
    return (
        <AsideWrapper isOn={isOn}>
        </AsideWrapper>
    );
};

export default AsideContainer;
