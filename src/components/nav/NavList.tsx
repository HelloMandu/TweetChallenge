import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
    src: string;
    title: string;
    link: string;
}

const NavItem: React.FC<NavItemProps> = ({ src, title, link }) => {
    return (
        <Link to={link}>
            <img src={src} alt="link-icon" />
            <span>{title}</span>
        </Link>
    );
};

interface NavListProps {
    list: {
        id: number;
        src: string;
        title: string;
        link: string;
    }[];
}

const NavList: React.FC<NavListProps> = ({ list }) => {
    return (
        <nav>
            <ul>
                {list.map(({ id, src, title, link }) => (
                    <li key={id}>
                        <NavItem src={src} title={title} link={link} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavList;
