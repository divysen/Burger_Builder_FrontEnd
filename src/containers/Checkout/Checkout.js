import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CheckOutSummary from '../../components/CheckOutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients : {
            cheese : 0,
            onion : 0,
            salad : 0,
            tomato : 0
        }
    }

    checkOutCancelled_handler = () => {
        this.props.history.goBack();
    }

    checkOutContinued_handler = () => {
        this.props.history.replace('/checkout/contact_data');
    }

    componentDidMount(){
        // let ingredients = {};
        
        /** conversting string to an array using split, then this array to an object by assigning
         * element[0] as keys and element[1] as values of object.
         */
        // this.props.location.search.replace('?','')
        //     .split('&').map( elem => {
        //         const element = elem.split('=');
        //         ingredients[element[0]] = parseInt(element[1],10);
        //         return element;
        //     });
        // console.log(ingredients);

        // a shorter method to do abobe task


        let ing = {};
        const query = new URLSearchParams(this.props.location.search);
        for( let elem of query){
            ing[elem[0]] = parseInt(elem[1],10);
        }
        this.setState({ ingredients: ing });
        // console.log(ing);
        console.log(this.props);
    }

    render(){
        
        return(
            <div>
                <CheckOutSummary 
                ingredients={this.state.ingredients}
                checkOutContinued={this.checkOutContinued_handler}
                checkOutCancelled={this.checkOutCancelled_handler}/>
                <Route path={'/checkout'+ this.props.location.search + '/contact_data'} component={ContactData}/>
            </div>
        );
    }
}

export default withRouter(Checkout);