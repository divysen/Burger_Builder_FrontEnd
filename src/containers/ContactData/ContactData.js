import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../axios_order';
import Button from '../../components/UI/Button/Button';
import StyleClass from './ContactData.css';
import FormStyleClass from '../../components/UI/Input/Input.css';

class ContactData extends Component{
    state = {
        orderform : {
            name: <input className={FormStyleClass.InputElement} type='text' onChange={(e1, id = 'name')=>this.inputChanged_Handler(e1, id = 'name')} name='user_name' placeholder='Your Name ?'/>,
            email: <input className={FormStyleClass.InputElement} type='email' onChange={(e2, id = 'email')=>this.inputChanged_Handler(e2, id = 'email')} name='user_email' placeholder='Your Email ID ?'/>,
            street: <input className={FormStyleClass.InputElement} type='text' onChange={(e3, id = 'street')=>this.inputChanged_Handler(e3, id = 'street')} name='user_address' placeholder='Your Address ?'/>,
            pincode: <input className={FormStyleClass.InputElement} type='number' onChange={(e4, id = 'pincode')=>this.inputChanged_Handler(e4, id = 'pincode')} name='user_pincode' placeholder='Your Pin Code ?'/>,
            delivery_speed: <select className={FormStyleClass.InputElement} onChange={(e5, id = 'delivery_speed')=>this.inputChanged_Handler(e5, id = 'delivery_speed')}>
                                <option value='-'>-----</option>
                                <option value='fastest'>Fastest</option>
                                <option value='cheapest'>Cheapest</option>
                            </select>
        },
        showmodel : false,
        loading : false,
        orderstatus: null
    }

    Order = {};

    componentDidMount(){
        // console.log(this.Order);
        console.log(this.props);
    }

    // closeModel_Handler = () => {
    //     const newStutus = false;
    //     this.setState({ showmodel : newStutus });
    // };

    orderPlaced_Handler(event){
        console.log(this.Order);
        // event.stopImmediatePropagation();
        event.preveneDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        this.setState({ showmodel: true, loading: true });
        const NewOrder = {
            ingredients_list: this.props.ingredients,
            total_price: this.props.total_price,
            customer_data: {
                name: 'Divy Sen',
                email: 'divysen.astro@gmail.com',
                address: {
                    street: 'Indore',
                    pincode: 452016
                },
                delivery_speed: ''
            }
        };

        AxiosInstance.post('/place-order',NewOrder)
        .then( res => {
            // console.log(res);
            this.setState({ loading: false, orderstatus: res.data[2] });
            setTimeout(() => {
                this.setState({ showmodel: false });
                // this.props.history.push('/');
            }, 3000);
            console.log(res);
        } )
        .catch( err => {
            this.setState({ loading: false, orderstatus: err.message });
            setTimeout(() => {
                this.setState({ showmodel: false });
                // this.props.history.push('/');
            }, 3000);
            console.log(err);
        } );
    };

    inputChanged_Handler = (event, identifier) => { 
        if ( this.state.orderform[identifier] ){
            // console.log(identifier, event.target.value);
            this.Order[identifier] = event.target.value;
        }
        /**following method is dicontinued as it has the complexity of O(n) */

        // for (const key in this.state.orderform) {
        //         if( key === identifier ){

        //             // this.Order[identifier] = event.target.value;
        //         }
        // }
    };

    render(){

        let dynamicForm = [];
        for (let entry in this.state.orderform) {
            dynamicForm.push(
                <div key={entry} className={FormStyleClass.Input}>
                    <label className={FormStyleClass.Label}>{entry.toUpperCase().replace(/[_]/g,' ')}</label>
                    {this.state.orderform[entry]}
                </div>
                );
        }
    
        return(
            <Fragment>
                <Modal show={this.state.showmodel} closeModal={this.closeModel_Handler}>
                    {this.state.loading ? 
                        <Spinner/> :
                        this.state.orderstatus}
                </Modal>
                <div className={StyleClass.ContactData}>
                    <h4>Enter Your Contact Data</h4>
                    <form>
                        {dynamicForm}
                        <Button btnType='Success' clicked={(es)=> this.orderPlaced_Handler(es)}>ORDER</Button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.reducer1.ingredients,
        total_price : state.reducer1.total_price
    }
};

export default connect(mapStateToProps)(withRouter(ContactData));