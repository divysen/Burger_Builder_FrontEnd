import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={CheckOut}/>
          <Route path='/orders' component={Orders}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;