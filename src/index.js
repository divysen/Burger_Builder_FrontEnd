import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import BbReducer from './store/reducers/bb_reducer';
import CoReducer from './store/reducers/co_reducer';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    reducer1 : BbReducer,
    reducer2 : CoReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
    rootReducer, composeEnhancers(
            applyMiddleware(thunk)
    )
);

ReactDOM.render(<Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> , document.getElementById('root'));
registerServiceWorker();