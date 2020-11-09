import React from 'react';
import StyleClass from './BuildControl.css'

const BuildControl = props => (
    <div className={StyleClass.BuildControl}>
        <div className={StyleClass.Label}>{props.label}</div>
        <button className={StyleClass.More} onClick={props.addiing}>More</button>
        <button className={StyleClass.Less} onClick={props.removing} disabled={props.disable}>Less</button>
    </div>
);

export default BuildControl;