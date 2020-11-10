import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import StyleClass from './Toolbar.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const Toolbar = props => (
    <header className={StyleClass.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={StyleClass.Logo}>
            <Logo/>
        </div>
        <nav className={StyleClass.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;