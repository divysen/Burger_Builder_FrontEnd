import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../src/store/reducers';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    reducer1 : Reducer
});

const Store = createStore(rootReducer);

ReactDOM.render(<Provider store={Store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();