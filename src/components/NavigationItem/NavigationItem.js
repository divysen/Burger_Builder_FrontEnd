import React from 'react';
import StyleClass from './NavigationItem.css';
import { Link } from 'react-router-dom';

const NavigationItem = props => (
    <li className={StyleClass.NavigationItem}>
        <Link to={props.link} onClick={() => props.close()}>{props.children}</Link>
        {/* <a href={props.link} className={props.active ? StyleClass.active : null}>{props.children}</a> */}
    </li>
);

export default NavigationItem;