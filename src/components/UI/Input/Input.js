import React from 'react';
import StyleClass from './Input.css';

const Input = (props) => {

    let inputElement = null;
    switch(props.elementttype){
        case 'input':
            inputElement = <input className={StyleClass.InputElement} {...props}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={StyleClass.InputElement} {...props}/>;
            break;
        default: 
            inputElement = <input className={StyleClass.InputElement} {...props}/>;
    }

    return(
        <div className={StyleClass.Input}>
            <label className={StyleClass.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;