import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import StyleClass from './CheckOutSummary.css';

const CheckOutSummary = (props) =>{
    return(
        <div className={StyleClass.CheckoutSummary}>
            <h3>Hope It Tastes well !</h3>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.checkOutCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkOutContinued}>CONTINUE</Button>
        </div>
    );
};

export default CheckOutSummary;