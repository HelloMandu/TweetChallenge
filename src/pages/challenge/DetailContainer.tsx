import React from "react";
import { RouteComponentProps } from "react-router-dom";

const DetailContainer: React.FC<RouteComponentProps> = ({match}) => {
    console.log(match);
    return <h1>상세페이지</h1>;
};

export default DetailContainer;
