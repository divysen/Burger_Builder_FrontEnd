import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckOutSummary from '../../components/CheckOutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Redirect } from 'react-router-dom';

class Checkout extends Component {

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


        // let ing = {};
        // const query = new URLSearchParams(this.props.location.search);
        // for( let elem of query){
        //     ing[elem[0]] = parseInt(elem[1],10);
        // }
        // this.setState({ ingredients: ing });
        // console.log(ing);
        console.log(this.props);
    }

    // getDedivedStateFromProps(props, state){
    //     if(this.props.total_price <= 10){
    //         this.props.history.goBack();
    //     }
    // }
    
    render(){
        if( this.props.ingredients ){
            return(
                <div>
                    <CheckOutSummary 
                    ingredients={this.props.ingredients}
                    checkOutContinued={this.checkOutContinued_handler}
                    checkOutCancelled={this.checkOutCancelled_handler}/>
                    <Route path={'/checkout/contact_data'} component={ContactData}/>
                </div>
            );
        }
        else{
            return(
                <Redirect to='/' />
            )
        }
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.reducer1.ingredients,
        total_price : state.reducer1.total_price
    }
};

export default connect(mapStateToProps)(withRouter(Checkout));