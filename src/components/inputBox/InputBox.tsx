import React, { forwardRef } from "react";
import "./InputBox.scss";

interface InputBoxProps {
    className?: string;
    type: string;
    value: string;
    placeholder?: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    ref?: React.Ref<HTMLInputElement>;
}

const InputBox: React.FC<InputBoxProps> = forwardRef(
    (
        { className, type, value, placeholder, name, onChange, onKeyDown },
        ref?: React.Ref<HTMLInputElement>
    ) => {
        return (
            <input
                className={className}
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={ref}
            />
        );
    }
);

InputBox.defaultProps = {
    className: "input-box",
};
export default InputBox;
