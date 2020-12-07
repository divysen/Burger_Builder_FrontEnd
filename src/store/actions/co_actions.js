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

export const postNewOrder = (newOrder) => {
    return dispatch => {
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
        } )
        .catch( error => {
            // this.setState({ loading: false, orderstatus: err.message });
            // setTimeout(() => {
            //     this.setState({ showmodel: false });
            //     // this.props.history.push('/');
            // }, 2000);
            console.log(error);
            dispatch(placeOrderError(error));
        } );
    }
}