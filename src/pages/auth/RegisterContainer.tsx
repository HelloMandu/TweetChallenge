import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { requestPostRegister } from '../../api/user';
import useNotistack from "../../hooks/useNotistack";

import Path from "../../path";
import Register from "../../components/auth/Register";


const RegisterContainer: React.FC = () => {
    const handleNotistack = useNotistack();
    const history = useHistory();
    const handleRegister = useCallback(async (name: string, email: string, password: string, birth: Date) => {
        try{
            const response = await requestPostRegister(name, email, password, birth);
            const { msg } = response;
            if(msg === 'success'){
                    handleNotistack('회원가입되었습니다.', 'success');
                    history.push(Path.auth.login);
            } else{
                handleNotistack(msg, 'warning');
            }
        } catch(e){
            handleNotistack('회원가입 도중 오류가 발생하였습니다.', 'error');
        }
    }, [handleNotistack, history]);
    return (
            <Register handleRegister={handleRegister}></Register>
    );
};

export default RegisterContainer;
