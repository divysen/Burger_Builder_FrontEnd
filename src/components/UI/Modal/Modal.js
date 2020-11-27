import React,{ useEffect } from 'react';
// import { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import StyleClass from './Modal.css';

const Modal = props => {

    useEffect( () => {
        console.log(`[Modal.js] useEffect updated with props.show`)
    }, [props.show, props.children]);

    return(
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
}

// class Modal extends Component{

//     shouldComponentUpdate(nextProps, nextState){
//         if(nextProps.show !== this.props.show){
//             console.log(`[Modal.js updated]`);
//             return true;
//         }
//         else{
//             return false;
//         } 
//     }

//     render(){
//         return(
//             <Auxiliary>
//                 <Backdrop show={this.props.show} back={this.props.closeModal}/>
//                 <div className={StyleClass.Modal}
//                     style={{
//                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                         opacity: this.props.show ? '1' : '0'
//                     }}>
//                     {this.props.children}
//                 </div>  
//             </Auxiliary>
//         );
//     };
// }

export default Modal;