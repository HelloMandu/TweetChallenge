import React from "react";
import NavList from "../components/nav/NavList";
import Path from "../path";

const category: any[] = [
    {
        id: 1,
        src: "test",
        title: "건강",
        link: `${Path.detail}/health`,
    },
    {
        id: 2,
        src: "test",
        title: "공부",
        link: `${Path.detail}/study`,
    },
    {
        id: 3,
        src: "test",
        title: "가족",
        link: `${Path.detail}/family`,
    },
    {
        id: 4,
        src: "test",
        title: "생활습관",
        link: `${Path.detail}/habit`,
    },
    {
        id: 5,
        src: "test",
        title: "취미",
        link: `${Path.detail}/hobby`,
    },
    {
        id: 6,
        src: "test",
        title: "업무스킬",
        link: `${Path.detail}/skill`,
    },
    {
        id: 7,
        src: "test",
        title: "감정관리",
        link: `${Path.detail}/emotion`,
    },
    {
        id: 8,
        src: "test",
        title: "돈관리",
        link: `${Path.detail}/money`,
    },
];
const NavContainer = () => {
    return <NavList list={category} />;
};

export default NavContainer;
