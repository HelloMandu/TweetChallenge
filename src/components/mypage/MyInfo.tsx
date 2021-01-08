import React from "react";
import moment from "moment";
import "moment/locale/ko";

import { API_SERVER } from "../../path";
import { UserState } from "../../store/user";

import './MyInfo.scss'

interface MyInfoProps {
    user: UserState;
}

const MyInfo: React.FC<MyInfoProps> = ({ user }) => {
    const { birth, name, email, profile } = user;
    return (
        <section className="myinfo-wrapper">
            <div className="profile-wrapper">
                <img
                    src={`${API_SERVER}/${
                        profile ? profile : "images/profile.png"
                    }`}
                    alt="profile"
                />
            </div>
            <div className="info">
                <span>이름</span>
                <span>{name}</span>
            </div>
            <div className="info">
                <span>이메일주소</span>
                <span>{email}</span>
            </div>
            <div className="info">
                <span>생년월일</span>
                <span>{moment(birth).format("YYYY년 MM월 DD일")}</span>
            </div>
        </section>
    );
};

export default MyInfo;
