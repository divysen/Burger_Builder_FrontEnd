import React from 'react';
import PropTypes from 'prop-types';
import StyleClass from './BurgerIngredient.css'

const BurgerIngredient = props => {

    let ingredient = null;

    switch(props.type){
        case 'bread-bottom':
            ingredient = <div className={StyleClass.BreadBottom}></div>;
            break;
        case 'bread-top':
            ingredient = (
                <div className={StyleClass.BreadTop}>
                    <div className={StyleClass.Seeds1}></div>
                    <div className={StyleClass.Seeds2}></div>
                </div>
            );
            break;
        case 'tomato':
            ingredient = <div className={StyleClass.Tomato}></div>;
            break;
        case 'salad':
            ingredient = <div className={StyleClass.Salad}></div>;
            break;
        case 'cheese':
            ingredient = <div className={StyleClass.Cheese}></div>;
            break;
        case 'onion':
            ingredient = <div className={StyleClass.Onion}></div>; 
            break;
        default:
            ingredient = null;
    }

    return ingredient;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;