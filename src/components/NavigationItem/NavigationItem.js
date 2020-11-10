import React from 'react';
import StyleClass from './NavigationItem.css';

const NavigationItem = props => (
    <li className={StyleClass.NavigationItem}>
        <a href={props.link} className={props.active ? StyleClass.active : null}>{props.children}</a>
    </li>
);

export default NavigationItem;