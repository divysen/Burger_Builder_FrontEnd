import React from 'react';
import StyleClass from './Order.css';

const Order = (props) => {
    // console.log(props);
    const ingredients = Object.entries(props.ingredients);
    const showinglist = ingredients.map( ig => {
        return <span style={{
             textTransform: 'capitalize',
             display: 'inline-block',
             margin: '0 2px',
             border: '1px solid #ccc',
             padding: '5px'
             }} key={ig[0]}>{ig[0]} ({ig[1]})</span>
    } )
    // console.log(showinglist);
    return(
        <div className={StyleClass.Order}>
            <p><strong>Ingredients:</strong> {showinglist}</p>
            <p><strong>Total Price:</strong> {props.price} &#x20B9;</p>
            <p><strong>Ordered By:</strong> {props.customer.name}</p>
            {/* <p><strong>Delivery Address:</strong> {props.customer.address.street},{props.customer.address.pincode}</p> */}
            <br></br>
        </div>
    );
}

export default Order;