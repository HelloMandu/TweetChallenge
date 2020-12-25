import React from 'react';
import { ButtonBase } from '@material-ui/core';
import './BasicButton.scss'

interface BasicButtonProps {
    className: string;
    title: string;
    onClick?: () => void;
}

const BasicButton = ({ className, title, onClick }: BasicButtonProps) => {
    return (
        <ButtonBase
            className={className}
            onClick={onClick}
        >
            {title}
        </ButtonBase>
    );
};

BasicButton.defaultProps = {
    className: "basic-button",
};

export default BasicButton;
