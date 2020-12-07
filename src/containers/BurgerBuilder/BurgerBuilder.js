import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as Action from '../../store/actions/bb_actions';
import WithErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component{
    
    state = {
        purchasing :  false,
        loading : false,
        error: null
    };

    purchasableState_handler = updatedQuantity => {
        if(updatedQuantity !== null){
            const ingQuantity = Object.values(updatedQuantity);
            //console.log(ingQuantity);
            const status =  ingQuantity.some( val => {
                return ( val > 0) ; 
            } );
            //console.log(status);
            return status;
        }else{
            return false;
        }
        
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
        setTimeout(() => {
            this.setState({ loading:  false, purchasing: false });
            /** routing to checkout route using history prop */
            this.props.history.push('/checkout');
        }, 1000);
    
        // alert('Continue to Payment ?');
    };

    componentDidMount(){
        if( !this.props.ingredients ){
            setTimeout( () => this.props.loadIngredient_Handler()
            , 1000);
        }
    }

    render(){
        const disabledInfo = {...this.props.ingredients};
        for (let ingred in disabledInfo){
            disabledInfo[ingred] = (disabledInfo[ingred] <= 0) ? true : false ;
        }
        if( this.props.ingredients ){
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
        else{
            return(
                <Auxiliary>
                    {this.props.error ?
                        <WithErrorHandler show closeModal={this.removeError_Handler} content={'Unable to Fetch Ingredients\n'+this.props.error}/> :
                        null}
                    <Spinner />
                </Auxiliary>
            );
        }
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.reducer1.ingredients,
        total_price : state.reducer1.total_price,
        error : state.reducer1.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        loadIngredient_Handler: () => dispatch(Action.fetchInitialIngredients()),
        addIngredient_Handler: ingType => dispatch(Action.addIngredients(ingType)),
        removeIngredient_Handler: ingType => dispatch(Action.removeIngredients(ingType))
    }    
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);