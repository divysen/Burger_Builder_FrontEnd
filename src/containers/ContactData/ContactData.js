import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../axios_order';
import Button from '../../components/UI/Button/Button';
import StyleClass from './ContactData.css';
import FormStyleClass from '../../components/UI/Input/Input.css';

let Order = {};

class ContactData extends Component{
    state = {
        orderform : {
            name: <input className={FormStyleClass.InputElement} type='text' onChange={(event)=>this.inputChanged_Handler(event)} name='user_name' placeholder='Your Name ?'/>,
            email: <input className={FormStyleClass.InputElement} type='email' onChange={(event)=>this.inputChanged_Handler(event)} name='user_email' placeholder='Your Email ID ?'/>,
            street: <input className={FormStyleClass.InputElement} type='text' onChange={(event)=>this.inputChanged_Handler(event)} name='user_address' placeholder='Your Address ?'/>,
            pincode: <input className={FormStyleClass.InputElement} type='number' onChange={(event)=>this.inputChanged_Handler(event)} name='user_pincode' placeholder='Your Pin Code ?'/>,
            delivery_speed: <select className={FormStyleClass.InputElement} onChange={(event)=>this.inputChanged_Handler(event)}>
                                <option value='fastest'>Fastest</option>
                                <option value='cheapest'>Cheapest</option>
                            </select>
        },
        showmodel : false,
        loading : false,
        orderstatus: null
    }

    componentDidMount(){
        console.log(Order);
        console.log(this.props);
    }

    // closeModel_Handler = () => {
    //     const newStutus = false;
    //     this.setState({ showmodel : newStutus });
    // };
    inputChanged_Handler = (event) => { 
        //console.log(event.target.value);
        for (const key in this.state.orderform) {
                Order[key] = event.target.value;
        }
    };

    orderPlaced_Handler(event){
        event.preveneDefault();
        
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
                        <Button btnType='Success' clicked={(event)=> this.orderPlaced_Handler(event)}>ORDER</Button>
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