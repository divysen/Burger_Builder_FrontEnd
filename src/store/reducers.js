import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        tomato: 0,
        onion: 0,
        salad: 0,
        cheese: 0
    },
    total_price : 10
};

const price = {
    salad: 10,
    cheese: 10,
    onion: 2,
    tomato: 3
};

const reducer = ( state = initialState, action ) => {

    const newState = {...state};

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            newState.ingredients = { ...state.ingredients };
            newState.ingredients[action.ingredientType] = state.ingredients[action.ingredientType] + 1;
            newState.total_price = state.total_price + price[action.ingredientType];
            return newState;
        case actionTypes.REMOVE_INGREDIENT:
            if( state.ingredients[action.ingredientType] >= 1 ){
                newState.ingredients = { ...state.ingredients };
                newState.ingredients[action.ingredientType] = state.ingredients[action.ingredientType] - 1;
                newState.total_price = state.total_price - price[action.ingredientType];
                return newState;
            }
            else{ return state; }
        default:
            return state;
    }
};

export default reducer;