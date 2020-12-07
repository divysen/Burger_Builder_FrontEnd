import * as actionTypes from '../actionTypes';
import AxiosInstance from '../../axios_order'

export const addIngredients = (item) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: item
    }
};

export const removeIngredients = (item) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: item
    }
};

export const setInitialIngredients = (items) => {
    return{
        type: actionTypes.INIT_INGREDIENT,
        initData: items
    }
}

export const setInitialIngredientsError = (e) => {
    return{
        type: actionTypes.INIT_INGREDIENT_ERR,
        initData: e
    }
}

export const fetchInitialIngredients = () => {
    return dispatch => {
        AxiosInstance.get('/get-ingredients')
        .then(response => {
            // console.log(response);
            dispatch(setInitialIngredients(response.data.data[0]));
        })
        .catch(error => {
            console.log('Error Occured in API response: ',error);
            dispatch(setInitialIngredientsError(error.message));
        });
    }
}