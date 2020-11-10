import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

const OrderSummary = props => {
    
    let ingredientList = []; 
    for (const item in props.ingredients) {
        if(props.ingredients[item] !== 0){
            ingredientList.push(<li key={item}>{item} : {props.ingredients[item]}</li>);
        }      
    };

    return(
    <Auxiliary>
        <h3>Your Order Summary</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
            {ingredientList}
        </ul>
        <p>Total Price : <strong>{props.burgerprice} &#x20B9;</strong></p>
        <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
        <Button btnType='Success' clicked={props.ordernow}>Continue</Button>
    </Auxiliary>
    );
}; 

export default OrderSummary;