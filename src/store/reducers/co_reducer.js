import * as actionTypes from '../actionTypes';

const initialstate = {
    orderstatus: null,
    error: null
};

const reducer = ( state = initialstate, action ) => {

    const newState = {...state};
    
    switch( action.type ){

        case actionTypes.PLACE_ORDER:

            newState.orderstatus = action.order;
            return newState;
        
        case actionTypes.PLACE_ORDER_ERR:

            newState.error = action.order;
            return newState;

        default:

            return state;
    }
    
};

export default reducer;