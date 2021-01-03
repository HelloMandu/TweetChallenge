import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import MyInfo from "../../components/mypage/MyInfo";
import ModifyMyInfo from "../../components/mypage/ModifyMyInfo";
import MyPageWrapper from "../../components/mypage/MyPageWrapper";
import useNotistack from "../../hooks/useNotistack";
import { requestPutModifyUser } from "../../api/user";
import { useHistory } from "react-router-dom";
import Path from "../../path";

const MyContainer: React.FC = () => {
    const handleNotistack = useNotistack();
    const history = useHistory();
    const user = useSelector((state: RootState) => state.user);
    const [modifyOpen, setModifyOpen] = useState<boolean>(false);
    const onToggleModify = useCallback(
        () => setModifyOpen((state) => !state),
        []
    );
    /*아직안댐*/
    const handleSignup = useCallback(
        async (
            profile: File | null,
            name: string,
            email: string,
            password: string,
            birth: Date
        ) => {
            const JWT_TOKEN = sessionStorage.getItem("user");
            try {
                if (!JWT_TOKEN) {
                    handleNotistack("로그인 후 이용해주세요.", "warning");
                    history.push(Path.auth.signin);
                    return;
                }
                const response = await requestPutModifyUser(
                    JWT_TOKEN,
                    profile,
                    name,
                    email,
                    password,
                    birth
                );
                const { msg } = response;
                if (msg === "success") {
                    handleNotistack("수정되었습니다.", "success");
                } else {
                    handleNotistack(msg, "warning");
                }
            } catch (e) {
                handleNotistack(
                    "개인정보 수정 도중 오류가 발생하였습니다.",
                    "error"
                );
            }
        },
        [handleNotistack, history]
    );
    return (
        <>
            <MyPageWrapper>
                <MyInfo user={user} onClickModify={onToggleModify} />
            </MyPageWrapper>
            <ModifyMyInfo
                open={modifyOpen}
                onToggle={onToggleModify}
                handleSignup={handleSignup}
            />
        </>
    );
};

export default MyContainer;
