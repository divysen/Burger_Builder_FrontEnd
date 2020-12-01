import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import StyleClass from './NavigationItems.css';

const NavigationItems = props => (
    <ul className={StyleClass.NavigationItems}>
        <NavigationItem close={props.back} link='/'>Burger Builder</NavigationItem>
        <NavigationItem close={props.back} link='/checkout'>Check Out</NavigationItem>
        <NavigationItem close={props.back} link='/orders'>Orders</NavigationItem>
    </ul>
);

export default NavigationItems;