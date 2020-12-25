import React from "react";
import "./InputBox.scss";

interface InputBoxProps {
    className: string;
    type: string;
    value: string;
    placeholder?: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = ({
    className,
    type,
    value,
    placeholder,
    name,
    onChange,
    onKeyDown,
}: InputBoxProps) => {
    return (
        <input
            className={className}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

InputBox.defaultProps = {
    className: "input-box",
};
export default InputBox;
