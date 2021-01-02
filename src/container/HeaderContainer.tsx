import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import { toggleAside } from "../store/aside";
import Header from "../components/header/Header";

const HeaderContainer: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const JWT_TOKEN = sessionStorage.getItem("user");
    const dispatch = useDispatch();
    return (
        <Header
            user={JWT_TOKEN ? user : null}
            toggleAside={() => dispatch(toggleAside())}
        ></Header>
    );
};

export default HeaderContainer;
