import React from 'react';
import StyleClass from './Button.css';

const Button = props => (
    <button className={[StyleClass.Button, StyleClass[props.btnType]].join(' ')}
            onClick={props.clicked}>{props.children}</button>
);

export default Button;
