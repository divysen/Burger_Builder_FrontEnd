import React from 'react';
import StyleClass from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
    <li className={StyleClass.NavigationItem}>
        <NavLink to={props.link} 
        activeClassName={StyleClass.active} exact
        onClick={() => props.close}>{props.children}</NavLink>
        {/* <a href={props.link} className={props.active ? StyleClass.active : null}>{props.children}</a> */}
    </li>
);

export default NavigationItem;