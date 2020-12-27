import React, { forwardRef } from "react";
import { ButtonBase } from "@material-ui/core";
import "./BasicButton.scss";

interface BasicButtonProps {
    className?: string;
    title: string;
    onClick?: () => void;
}

const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>(
    ({ className, title, onClick }, ref) => {
        return (
            <ButtonBase className={className} onClick={onClick} ref={ref}>
                {title}
            </ButtonBase>
        );
    }
);

BasicButton.defaultProps = {
    className: "basic-button",
};

export default React.memo(BasicButton);
