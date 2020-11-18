import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    
    state = {
        purchasing :  false
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

    checkout_Handler = () => {
        alert('Continue to Payment ?');
    };

    render(){
        const disabledInfo = {...this.props.ingredients};
        for (let ingred in disabledInfo){
            disabledInfo[ingred] = (disabledInfo[ingred] <= 0) ? true : false ;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchasing_Handler}>
                    <OrderSummary ingredients={this.props.ingredients} 
                                cancel={this.cancelPurchasing_Handler} ordernow={this.checkout_Handler}
                                burgerprice={this.props.total_price.toFixed(2)}/>
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