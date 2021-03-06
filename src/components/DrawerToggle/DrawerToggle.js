import React from 'react';
import StyleClass from './DrawerToggle.css';

const DrawerToggle = props => (
    <div className={StyleClass.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;