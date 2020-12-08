import * as actionTypes from '../actionTypes';

const initialstate = {
    orderstatus: null,
    error: null,
    showmodel: false
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

        case actionTypes.SHOW_MODEL:
            newState.showmodel = true;
            return newState;

        case actionTypes.HIDE_MODEL:
            newState.showmodel = false;
            return newState;
                
        default:

            return state;
    }
    
};

export default reducer;