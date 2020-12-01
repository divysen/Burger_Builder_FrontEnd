import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import StyleClass from './SideDrawer.css';
import BackDrop from '../UI/Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';

const SideDrawer = props => {
    
    let attachedClasses = [StyleClass.SideDrawer, StyleClass.Close]
    if(props.open){
        attachedClasses = [StyleClass.SideDrawer, StyleClass.Open]
    }
    return(
        <Auxiliary>
            <BackDrop show={props.open} back={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={StyleClass.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems back={props.closed}/>
                </nav>
            </div>
        </Auxiliary>
    )
};

export default SideDrawer;