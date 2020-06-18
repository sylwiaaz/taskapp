import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { reduxFirebase } from './firebase/fb.config';
import App from './App';


ReactDOM.render(
   <Provider store={store}>
      <ReactReduxFirebaseProvider {...reduxFirebase}>
         <App/>
      </ReactReduxFirebaseProvider>
   </Provider>,
   document.getElementById('root')
);
