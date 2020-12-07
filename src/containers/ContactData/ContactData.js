import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import StyleClass from './ContactData.css';
import FormStyleClass from '../../components/UI/Input/Input.css';
import * as Action from '../../store/actions/co_actions';

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
        formoverallvalid: false, 
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
            // this.setState({ formoverallvalid: true });
            const NewOrder = {
                ingredients_list: this.props.ingredients,
                total_price: this.props.total_price,
                customer_data: this.Customer_Data
            };
            // this.setState({ showmodel: true, loading: true, order: NewOrder });
            this.props.callPlaceOrderApi(NewOrder);
            // console.log('Order before api calling',NewOrder);
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
                <Modal show={!(this.props.orderstatus || this.props.error)} closeModal={this.closeModel_Handler}>
                    {!(this.props.orderstatus || this.props.error) ? 
                        <Spinner/> :
                        this.props.orderstatus ? this.props.orderstatus: this.props.error}
                </Modal>
                <div className={StyleClass.ContactData}>
                    <h4>Enter Your Contact Data</h4>
                    <form method='POST'>
                        {dynamicForm}
                        <Button btnType='Success' 
                        // disable={!this.state.formoverallvalid}
                        clicked={(es)=> this.orderPlaced_Handler(es)}>ORDER</Button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.reducer1.ingredients,
        total_price : state.reducer1.total_price,
        orderstatus : state.reducer2.orderstatus,
        error : state.reducer2.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        callPlaceOrderApi : newOrder => dispatch(Action.postNewOrder(newOrder)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData));