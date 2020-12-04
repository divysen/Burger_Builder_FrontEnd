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

    Customer_Data = {};

    state = {
        orderform : {
            name: <input className={FormStyleClass.InputElement} type='text' 
            onChange={(e1, id = 'name')=>this.inputChanged_Handler(e1, id = 'name')} name='user_name' 
            placeholder='Your Name ?' required maxLength='30' minLength='4'/>,

            email: <input className={FormStyleClass.InputElement} type='email' 
            onChange={(e2, id = 'email')=>this.inputChanged_Handler(e2, id = 'email')} name='user_email' 
            placeholder='Your Email ID ?' required maxLength='20' minLength='8'/>,

            street: <input className={FormStyleClass.InputElement} type='text'
            onChange={(e3, id = 'street')=>this.inputChanged_Handler(e3, id = 'street')} name='user_address'
            placeholder='Your Address ?' required maxLength='50' minLength='8'/>,

            pincode: <input className={FormStyleClass.InputElement} type='number' 
            onChange={(e4, id = 'pincode')=>this.inputChanged_Handler(e4, id = 'pincode')} name='user_pincode' 
            placeholder='Your Pin Code ?' required maxLength='6' minLength='6'/>,

            delivery_speed: <select className={FormStyleClass.InputElement} 
            onChange={(e5, id = 'delivery_speed')=>this.inputChanged_Handler(e5, id = 'delivery_speed')}>
                                <option value='-'>-----</option>
                                <option value='fastest'>Fastest</option>
                                <option value='cheapest'>Cheapest</option>
                            </select>
        },
        feedbackclass : {
            name: [FormStyleClass.Input],
            email: [FormStyleClass.Input],
            street: [FormStyleClass.Input],
            pincode: [FormStyleClass.Input],
            delivery_speed: [FormStyleClass.Input]
        }, 
        order : null,
        showmodel : false,
        loading : false,
        orderstatus: null
    }

    componentDidMount(){
        // console.log(this.Customer_Data);
        // console.log(this.props);
    }

    // closeModel_Handler = () => {
    //     const newStutus = false;
    //     this.setState({ showmodel : newStutus });
    // };

    orderPlaced_Handler(event){
        // event.stopImmediatePropagation();
        event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();

        let emptyFields = '';
        for (const key in this.state.orderform) {
            if ( !this.Customer_Data[key] ) {
                emptyFields = emptyFields.concat(key.toUpperCase().replace('_',' ')+' ');
            }
        }

        if( emptyFields !== '' ){
            alert('Please fill '+ emptyFields+' Fields');
        }
        else{
            const NewOrder = {
                ingredients_list: this.props.ingredients,
                total_price: this.props.total_price,
                ...this.Customer_Data
            };
            this.setState({ showmodel: true, loading: true, order: NewOrder });
            console.log(NewOrder);
            AxiosInstance.post('/place-order',NewOrder)
            .then( res => {
                // console.log(res);
                this.setState({ loading: false, orderstatus: res.data[2] });
                setTimeout(() => {
                    this.setState({ showmodel: false });
                    // this.props.history.push('/');
                }, 2000);
                console.log(res);
            } )
            .catch( err => {
                this.setState({ loading: false, orderstatus: err.message });
                setTimeout(() => {
                    this.setState({ showmodel: false });
                    // this.props.history.push('/');
                }, 2000);
                console.log(err);
            } );
        }    
    };

    inputChanged_Handler = (event, identifier) => { 
        if ( this.state.orderform[identifier] ){
            let validStatus = this.validation_Handler( this.state.orderform[identifier], event.target.value );
            // console.log(validStatus);
            this.validationFeedback_Handler(identifier, validStatus);
            if( validStatus ){
                this.Customer_Data[identifier] = event.target.value;
                // console.log(this.Customer_Data[identifier]);
            }
        }
    };

    validationFeedback_Handler(formField, status){
        let newclass = {...this.state.feedbackclass};
        if( status ){
            newclass[formField] = [FormStyleClass.Input];
            this.setState({ feedbackclass: newclass });
        }
        else{
            newclass[formField] = [FormStyleClass.Input, FormStyleClass.Invalid];
            this.setState({ feedbackclass: newclass });
        }
        
    }

    validation_Handler(formField, fieldValue){
        // console.log( formField.props );
        let requiredValidation = false, maxLengthValidation = false, minLengthValidation = false;

        if ( formField.props.required ){
            requiredValidation = formField.props.required === !!fieldValue.trim();
            // console.log('required validation: ',requiredValidation);
        }
        else{
            requiredValidation = true;
        }
        if ( formField.props.maxLength ){
            maxLengthValidation = formField.props.maxLength >= fieldValue.length;
            // console.log('maxLength validation: ', maxLengthValidation);
        }
        else{
            maxLengthValidation = true;
        }
        if ( formField.props.minLength ){
            minLengthValidation = formField.props.minLength <= fieldValue.length;
            // console.log('minLenght validation: ', minLengthValidation);
        }
        else{
            minLengthValidation = true;
        }
        return requiredValidation && maxLengthValidation && minLengthValidation;
    }

    render(){

        let dynamicForm = [];
        for (let entry in this.state.orderform) {
            dynamicForm.push(
                <div key={entry} className={this.state.feedbackclass[entry].join(' ')}>
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
                    <form method='POST'>
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