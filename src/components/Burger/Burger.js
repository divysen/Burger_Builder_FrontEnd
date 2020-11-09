import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import StyleClass from './Burger.css';

const Burger = props => {
    
    /** a classical problem of converting an object having key, value pair to its equivalent array
     * form using 2 nested map method would result in heard to read & understand code, hence
     * STEP 1: store values(if they are number) in an temp array
     * STEP 2: store keys in another array and use reduce function with initial value as an empty array
     *         and pass values array as this object, then in an loop push values in result and return it */

    let initialIngredientsValues = Array.from(Object.values(props.ingredients));
    let initialIngredientsArray = Array.from(Object.keys(props.ingredients))
        .reduce( function( result, val, idx ){
        for(let i=1; i<=initialIngredientsValues[idx]; i++){
            result.push(<BurgerIngredient key={val+i} type= {val}/>);
        }
        return result;
    },[]);
    //console.log(initialIngredientsArray);
    if(initialIngredientsArray.length === 0){
        initialIngredientsArray = <p>Please Add Some ingredients</p>
    }
    return (
        <div className={StyleClass.Burger}>
            <BurgerIngredient key='top' type='bread-top'/>
            {initialIngredientsArray}    
            <BurgerIngredient key='bottom' type='bread-bottom'/>
        </div>
    );
}

export default Burger;