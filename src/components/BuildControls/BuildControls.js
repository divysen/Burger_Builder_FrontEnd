import React from 'react';
import BuildControl from '../BuildControl/BuildControl';
import StyleClass from './BuildControls.css';

const Controls = [
    { label : 'Onion', type : 'onion'},
    { label : 'Cheese', type : 'cheese'},
    { label : 'Tomato', type : 'tomato'},
    { label : 'Salad', type : 'salad'}
]

const BuildControls = props => (
    <div className={StyleClass.BuildControls}>
        <p>Price:<strong>{props.burgerprice} &#x20B9;</strong></p>
        {
            Controls.map( (val, idx) => {
                return <BuildControl addiing={() => props.add(val.type)} removing={() => props.remove(val.type)} 
                                    key={val.type} label={val.label} disable={props.disabled[val.type]}/>
            } )
        }
        <button className={StyleClass.OrderButton} onClick={props.purchase} disabled={!(props.purchasable)}>Order Now</button>
    </div>
); 

export default BuildControls;