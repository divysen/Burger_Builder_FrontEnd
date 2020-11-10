import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import StyleClass from './NavigationItems.css';

const NavigationItems = props => (
    <ul className={StyleClass.NavigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem link='/'>Check Out</NavigationItem>
    </ul>
);

export default NavigationItems;