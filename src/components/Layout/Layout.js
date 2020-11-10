import React,{ Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import StyleClass from './Layout.css';

class Layout extends Component{

    state = {
        showSideDrawer : false
    }

    sideDrawer_handler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggle_handler = () => {
        this.setState( (prevState, props) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        } );
    };

    render(){
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggle_handler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawer_handler}/>    
                <main className={StyleClass.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;