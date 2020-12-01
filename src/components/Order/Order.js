import React from 'react';
import './Order.css';

const Order = (props) => {
    return(
        <div className='Order'>
            <p>Ingrediants: Dummy Ingrediants{props.ingredients}</p>
            <p>Price: Dummy Price<strong>{props.price}</strong></p>
            <p>Ordered By: Dummy Customer{props.customer}</p>
            <br></br>
        </div>
    );
}

export default Order;