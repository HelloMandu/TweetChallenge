import React from 'react';
import cn from 'classnames';
import { Action } from 'redux';

import { Dialog as MaterialDialog } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';

import './Dialog.scss';

interface DialogProps {
    open: boolean;
    title: string;
    confirm: boolean;
    text: string;
    onClick: () => void;
    onClose: () => Action<any>;
}

const Dialog: React.FC<DialogProps> = ({ open, title, confirm, text, onClick, onClose }) => {
    return (
        <MaterialDialog open={open} onClose={onClose}>
            <div className={cn('dialog', { confirm })}>
                <div className={'dialog-area'}>
                    <div className={'dialog-content'}>
                        <h3 className={'dialog-title'}>{title}</h3>
                        {text && <p className={'dialog-text'}>{text}</p>}
                    </div>
                    <div className={'dialog-bottom'}>
                        {confirm && (
                            <ButtonBase className={cn('dialog-button')} onClick={onClose}>
                                아니오
                            </ButtonBase>
                        )}
                        <ButtonBase
                            className={cn('dialog-button', 'dialog-active')}
                            onClick={onClick}
                        >
                            {confirm ? '예' : '확인'}
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </MaterialDialog>
    );
};

export default Dialog;
