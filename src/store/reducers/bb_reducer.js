import * as actionTypes from '../actionTypes';

const initialState = {
    ingredients: null,
    total_price : 10,
    price: null,
    error: null
};

const reducer = ( state = initialState, action ) => {

    const newState = {...state};

    switch( action.type ){

        case actionTypes.ADD_INGREDIENT:

            newState.ingredients = { ...state.ingredients };
            newState.ingredients[action.ingredientType] = state.ingredients[action.ingredientType] + 1;
            newState.total_price = state.total_price + state.price[action.ingredientType];
            return newState;

        case actionTypes.REMOVE_INGREDIENT:

            if( state.ingredients[action.ingredientType] >= 1 ){
                newState.ingredients = { ...state.ingredients };
                newState.ingredients[action.ingredientType] = state.ingredients[action.ingredientType] - 1;
                newState.total_price = state.total_price - state.price[action.ingredientType];
                return newState;
            }
            else{ return state; }

        case actionTypes.INIT_INGREDIENT:
            newState.ingredients = action.initData.ingredients;
            newState.total_price = action.initData.total_price;
            newState.price = action.initData.price;
            return newState;

        case actionTypes.INIT_INGREDIENT_ERR:
            newState.error = action.initData;
            return newState;

        default:

            return state;
    }
};

export default reducer;