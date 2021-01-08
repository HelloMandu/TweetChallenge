import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { dialogOpen } from '../store/dialog';

const useDialog = (): any => {
    const dispatch = useDispatch();
    const openDialog = useCallback(
        (title: string, handleClick: any, text = '', confirm = false) =>
            dispatch(dialogOpen(title, handleClick, text, confirm)),
        [dispatch]
    );
    return openDialog;
};

export default useDialog;
