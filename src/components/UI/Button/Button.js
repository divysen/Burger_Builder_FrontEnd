import React from 'react';
import StyleClass from './Button.css';

const Button = props => (
    <button className={[StyleClass.Button, StyleClass[props.btnType]].join(' ')}
    onClick={props.clicked} disabled={props.disable}>{props.children}</button>
);

export default Button;