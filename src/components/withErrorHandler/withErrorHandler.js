import React from 'react';
import Modal from '../UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary';
// import { useEffect } from 'react';

/** converting withErrorHandler HOC to normal component */

const withErrorHandler = 

// ( WrappedComponent, ErrorObject ) => {
    // return 
    (props) => {
        return (
            <Auxiliary>
                <Modal show={props.show} 
                closeModal={props.closeModal}
                >{props.content}</Modal>
                {/* <WrappedComponent {...props} /> */}
            </Auxiliary>
        );
    }
// }

export default withErrorHandler;