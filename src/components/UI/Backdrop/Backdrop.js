import React from 'react';
import StyleClass from './Backdrop.css'

const Backdrop = props => (
    props.show ? <div className={StyleClass.Backdrop} onClick={props.back}></div> : null
);

export default Backdrop;