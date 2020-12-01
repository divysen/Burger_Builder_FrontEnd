import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../axios_order';
import Button from '../../components/UI/Button/Button';
import StyleClass from './ContactData.css';

class ContactData extends Component{
    state = {
        user : {
            name: '',
            email: '',
            address: {
                street: '',
                pincode: ''
            }
        },
        showmodel : false,
        loading : false,
        orderstatus: null
    }

    componentDidMount(){
        console.log(this.props);
    }

    // closeModel_Handler = () => {
    //     const newStutus = false;
    //     this.setState({ showmodel : newStutus });
    // };

    orderPlaced_Handler(event){
        event.preventDefault();
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
                }
            }
        };

        AxiosInstance.post('/place-order',NewOrder)
        .then( res => {
            // console.log(res);
            this.setState({ loading: false, orderstatus: res.data[2] });
            setTimeout(() => {
                this.setState({ showmodel: false });
                this.props.history.push('/');
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
                        <input type='text' name='user_name' placeholder='Your Name ?'/>
                        <input type='email' name='user_email' placeholder='Your Email ID ?'/>
                        <input type='text' name='user_address' placeholder='Your Address ?'/>
                        <input type='number' name='user_pincode' placeholder='Your Pin Code ?'/>
                        <br></br>
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