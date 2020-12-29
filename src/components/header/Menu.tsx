import React from 'react';
import { IconButton } from '@material-ui/core';

import MenuIcon from '../../static/asset/MenuIcon';


interface MenuProps{
    onToggle?: () => void
}

const Menu: React.FC<MenuProps> = ({onToggle}) => {
    return (
        <IconButton onClick={onToggle} className={'menu-button'}>
            <MenuIcon/>
        </IconButton>
    )
}

export default Menu;