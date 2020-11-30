import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import StyleClass from './ContactData.css';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pincode: ''
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return(
            <div className={StyleClass.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type='text' name='user_name' placeholder='Your Name ?'/>
                    <input type='email' name='user_email' placeholder='Your Email ID ?'/>
                    <input type='text' name='user_address' placeholder='Your Address ?'/>
                    <input type='number' name='user_pincode' placeholder='Your Pin Code ?'/>
                    <br></br>
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;