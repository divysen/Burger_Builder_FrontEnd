import * as actionTypes from '../actionTypes';
import AxiosInstance from '../../axios_order'

export const placeOrder = (newOrder) => {
    return{
        type: actionTypes.PLACE_ORDER,
        order: newOrder
    }
}

export const placeOrderError = (e) => {
    return{
        type: actionTypes.PLACE_ORDER_ERR,
        order: e
    }
}

export const showModel = () => {
    return{
        type: actionTypes.SHOW_MODEL
    }
}

export const hideModel = () => {
    return{
        type: actionTypes.HIDE_MODEL
    }
}

export const postNewOrder = (newOrder) => {
    return dispatch => {
        dispatch(showModel());
        AxiosInstance.post('/place-order',newOrder)
        .then( response => {
            // console.log(res);
            // this.setState({ loading: false, orderstatus: res.data[2] });
            // setTimeout(() => {
            //     this.setState({ showmodel: false });
            //     this.props.history.push('/');
            // }, 2000);
            console.log(response);
            dispatch(placeOrder(response.data[2]));
            setTimeout(() => dispatch(hideModel()), 3000) ;
        } )
        .catch( error => {
            // this.setState({ loading: false, orderstatus: err.message });
            // setTimeout(() => {
            //     this.setState({ showmodel: false });
            //     // this.props.history.push('/');
            // }, 2000);
            console.log(error);
            dispatch(placeOrderError(error.message));
            setTimeout(() => dispatch(hideModel()), 3000) ;
        } );
    }
}