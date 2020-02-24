import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App/App';
import { Provider } from 'react-redux';
import { store } from './App/store/index';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
