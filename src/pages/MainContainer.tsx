import React, { useCallback, useState } from "react";
import AsideContainer from "../container/AsideContainer";
import HeaderContainer from "../container/HeaderContainer";

const MainContainer: React.FC = () => {
    const [isOnAside, setIsOnAside] = useState<boolean>(false);
    const handleToggleAside = useCallback(
        () => setIsOnAside((isOnAside) => !isOnAside),
        []
    );
    return (
        <div>
            <HeaderContainer toggleAside={handleToggleAside}/>
            <AsideContainer isOn={isOnAside}/>
        </div>
    );
};

export default MainContainer;
