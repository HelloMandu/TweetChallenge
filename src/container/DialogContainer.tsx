import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../components/dialog/Dialog';

import { RootState } from '../store/index';
import { dialogClose } from '../store/dialog';

const DialogContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { open, title, confirm, text, handleClick } = useSelector(
        (state: RootState) => state.dialog
    );
    const onClose = useCallback(() => dispatch(dialogClose()), [dispatch]);
    const onClick = useCallback(() => {
        handleClick?.();
        onClose();
    }, [handleClick, onClose]);

    const onKeyDown = useCallback(
        (e) => {
            if (open) {
                if (e.key === 'Enter') {
                    onClick();
                } else if (e.key === 'Escape') {
                    onClose();
                }
                e.stopPropagation();
            }
        },
        [onClick, onClose, open]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [onKeyDown]);
    if (!open) {
        return null;
    }
    return (
        <Dialog
            open={open}
            title={title}
            confirm={confirm}
            text={text}
            onClick={onClick}
            onClose={onClose}
        />
    );
};

export default DialogContainer;
