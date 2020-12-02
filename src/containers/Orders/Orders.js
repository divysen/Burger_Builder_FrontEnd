import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../axios_order';

class Orders extends Component{

    state = {
        myorders : [],
        showmodel : false,
        loading : false,
        error: null
    }

    componentDidMount(){
        this.setState({ showmodel: true, loading: true });
        if( this.state.myorders.length === 0 ){
            AxiosInstance.post('/user/get-orders',{ 'user_email': 'divysen.astro@gmail.com' })
            .then( res => {
                console.log(res.data.Message);
                this.setState({ showmodel:  false, loading: false, myorders: res.data.Message });
            })
            .catch( err => {
                console.log(err);
                this.setState({ showmodel:  false, loading: false, error: err });
            });
        }
        else{
            console.log('Api not called, showing results from state');
            this.setState({ showmodel:  false, loading: false });
        }
    }

    render(){
        return(
            <Fragment>
                <Modal show={this.state.showmodel} closeModal={this.closeModel_Handler}>
                    {this.state.loading ? <Spinner/> : null}
                </Modal>
                <div>
                    {
                        this.state.myorders.length === 0 ?
                            'No Order Found !!!' :                        
                            this.state.myorders.map( order => {
                                return <Order key={order._id} ingredients={order.ingredients} 
                                              price={order.price} customer={order.customer}/>
                            } )
                    }
                </div>
            </Fragment>
        );
    }
}

export default Orders;