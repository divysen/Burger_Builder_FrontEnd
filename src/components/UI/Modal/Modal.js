import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import StyleClass from './Modal.css';

const Modal = props => (
    <Auxiliary>
        <Backdrop show={props.show} back={props.closeModal}/>
        <div className={StyleClass.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>  
    </Auxiliary>
);

export default Modal;