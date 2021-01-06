import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Action } from 'redux';
import { Backdrop } from '@material-ui/core';

import Menu from '../header/Menu';

import './AsideWrapper.scss';

interface AsideWrapperProps {
    isOn: boolean;
    offAside: () => Action<any>;
    children?: React.ReactNode;
}

const AsideWrapper = forwardRef<HTMLDivElement, AsideWrapperProps>(
    ({ isOn, offAside, children }, ref) => {
        return (
            <>
                <aside className={cn('aside-wrapper', { on: isOn })} ref={ref}>
                    <div className="menu-wrapper">
                        <Menu onToggle={offAside}></Menu>
                    </div>
                    {children}
                </aside>
                {isOn && <Backdrop open={isOn} className="dim" onClick={offAside} />}
            </>
        );
    }
);

export default AsideWrapper;
