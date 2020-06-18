import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { isAuth } from 'store/reducers/authReducer';
import { CircularProgress } from '@material-ui/core';
import './authIsLoaded.scss';


const AuthIsLoaded: FunctionComponent = ({ children }: any) => {
   const auth = useSelector(isAuth);

   return (
      !isLoaded(auth) ? (<div className='loading-wrapper'> <CircularProgress size={200}/></div>) : (children)
   );
};

export default AuthIsLoaded;