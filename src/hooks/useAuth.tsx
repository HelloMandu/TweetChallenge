import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, deleteUser } from '../store/user';

import useNotistack from './useNotistack';

export const useLogin = () => {
    const dispatch = useDispatch();
    const handleSnackbar = useNotistack();
    const handleLogin = useCallback((JWT_TOKEN: string) => {
        dispatch(getUser(JWT_TOKEN));
        handleSnackbar('로그인 되었습니다.', 'success');
    }, [dispatch, handleSnackbar]);
    return handleLogin;
};

export const useLogout = () => {
    const dispatch = useDispatch();
    const handleSnackbar = useNotistack();
    // const openDialog = useDialog();
    const handleLogout = useCallback((JWT_TOKEN: string) => {
        // openDialog('로그아웃', () => {
        //     dispatch(deleteUser(JWT_TOKEN));
        //     handleSnackbar('로그아웃 되었습니다.', 'success');
        // }, '로그아웃 하시겠습니까?', true);
    }, []);
    return handleLogout;
};
