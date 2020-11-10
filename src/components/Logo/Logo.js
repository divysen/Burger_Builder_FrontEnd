import React from 'react';
import BurgerLogo from '../../assets/images/logo.png';
import StyleClass from './Logo.css';

const Logo = props => (
    <div className={StyleClass.Logo}>
        <img  src={BurgerLogo} alt='Burger-Logo'></img>
    </div>
);

export default Logo;