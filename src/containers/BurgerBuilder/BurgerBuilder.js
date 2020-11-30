import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import AxiosInstance from '../../axios_order';
import WithErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component{
    
    state = {
        purchasing :  false,
        loading : false,
        error: null
    };

    purchasableState_handler = updatedQuantity => {
        const ingQuantity = Object.values(updatedQuantity);
        //console.log(ingQuantity);
        const status =  ingQuantity.some( val => {
            return ( val > 0) ; 
        } );
        //console.log(status);
        return status;
    };

    purchasing_Handler = event => {
        const newStatus = true;
        this.setState({ purchasing :  newStatus });
    };

    cancelPurchasing_Handler = () => {
        const newStutus = false;
        this.setState({ purchasing : newStutus });
    };

    removeError_Handler = () => {
        const newState = null;
        this.setState({ error: newState });
    };

    checkout_Handler = () => {
        // console.log(this.props);
        this.setState({ loading:  true });
        const NewOrder = {
            ingredients_list: this.props.ingredients,
            total_price: this.props.total_price,
            customer_data: "Divy Sen"
        }

        const ingQueryParam = Object.entries(this.props.ingredients).join('&').replace(/[,]/g,'=');
        // console.log(ingQueryParam);
        // alert('Continue to Payment ?');
        AxiosInstance.post('/place-order',NewOrder)
        .then( res => {
            setTimeout(() => this.setState({ loading:  false, purchasing: false }), 2000);

            /** routing to checkout route using history prop */
            this.props.history.push({
                pathname: '/checkout',
                search: '?' + ingQueryParam
            });
            console.log(res);
        } )
        .catch( err => {
            setTimeout(() => {
                this.setState({ loading:  false, purchasing: false, error: err.message });
            }, 2000);

            /** routing to checkout route using history prop */
            this.props.history.push({
                pathname: '/checkout',
                search: '?' + ingQueryParam
            });
            console.log(err);
        } );
    };

    render(){
        const disabledInfo = {...this.props.ingredients};
        for (let ingred in disabledInfo){
            disabledInfo[ingred] = (disabledInfo[ingred] <= 0) ? true : false ;
        }
        return(
            <Auxiliary>
                {/** instead of using WithErrorHandler as Higher Order Component, using it as normal component */}
                {this.state.error ?
                 <WithErrorHandler show closeModal={this.removeError_Handler} content={this.state.error}/> :
                 null}
                
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchasing_Handler}>
                    { this.state.loading ?
                        <Spinner /> :
                        <OrderSummary ingredients={this.props.ingredients} 
                        cancel={this.cancelPurchasing_Handler} ordernow={this.checkout_Handler}
                        burgerprice={this.props.total_price.toFixed(2)}/>
                    }
                </Modal>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls burgerprice={this.props.total_price.toFixed(2)} disabled={disabledInfo}
                            add={this.props.addIngredient_Handler} remove={this.props.removeIngredient_Handler}
                            purchasable={this.purchasableState_handler(this.props.ingredients)} purchase={this.purchasing_Handler}/>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.reducer1.ingredients,
        total_price : state.reducer1.total_price
    }
};

const mapDispatchToProps = dispatch => {
    return{
        addIngredient_Handler: ingType => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: ingType }),
        removeIngredient_Handler: ingType => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingType })
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);