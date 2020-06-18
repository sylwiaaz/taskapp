import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import './navbar.scss';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';
import { useSelector } from 'react-redux';
import { isAuth } from 'store/reducers/authReducer';


const Navbar: FunctionComponent = () => {

   const isAuthUser = useSelector(isAuth);

   return (
      <nav className='nav-wrapper'>
         <Link to='/' className='app-name'>Taskapp</Link>
         {!isAuthUser.uid ? <SignedOutLinks/> : <SignedInLinks/>}
      </nav>
   );
};

export default Navbar;