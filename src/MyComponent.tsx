import React from "react";

interface Props {
    name: string;
    age?: number;
}

const MyComponent:React.FC<Props> = ({ name, age = 23 }) => {
    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
};

export default MyComponent;
