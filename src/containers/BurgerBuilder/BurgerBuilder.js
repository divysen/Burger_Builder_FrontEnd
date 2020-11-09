import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const price = {
    salad: 10,
    cheese: 10,
    onion: 2,
    tomato: 3
};

const basic_price = 10;

class BurgerBuilder extends Component{
    
    state = {
        ingredients: {
            tomato: 0,
            onion: 0,
            salad: 0,
            cheese: 0
        },
        total_price : basic_price
    };

    addIngredient_Handler = ingredientType => {
        const oldQuantity = this.state.ingredients[ingredientType];
        const newQuantity = oldQuantity + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[ingredientType] = newQuantity;
        const priceAddition = price[ingredientType];
        const oldTotalPrice = this.state.total_price;
        const updatedTotalPrice = oldTotalPrice + priceAddition;
        this.setState({ ingredients: updateIngredients, total_price: updatedTotalPrice });
    };

    removeIngredient_Handler = ingredientType => {
        const oldQuantity = this.state.ingredients[ingredientType];
        if(oldQuantity >= 1){
            const newQuantity = oldQuantity - 1;
            const updateIngredients = {...this.state.ingredients};
            updateIngredients[ingredientType] = newQuantity;
            const priceSubtraction = price[ingredientType];
            const oldTotalPrice = this.state.total_price;
            const updatedTotalPrice = oldTotalPrice - priceSubtraction;
            this.setState({ ingredients: updateIngredients, total_price: updatedTotalPrice });
        }
        else{ return; }
    };

    render(){
        const disabledInfo = {...this.state.ingredients};
        for (let ingred in disabledInfo){
            disabledInfo[ingred] = (disabledInfo[ingred] <= 0) ? true : false ;
        }
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls burgerprice={this.state.total_price.toFixed(2)} disabled={disabledInfo}
                            add={this.addIngredient_Handler} remove={this.removeIngredient_Handler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;