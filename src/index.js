import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../src/store/reducers';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    reducer1 : Reducer
});

const Store = createStore(rootReducer);

ReactDOM.render(<Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> , document.getElementById('root'));
registerServiceWorker();