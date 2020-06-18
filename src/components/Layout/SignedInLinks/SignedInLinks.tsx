import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/reducers/authReducer';
import { auth } from 'firebase/fb.config';
import { Avatar } from '@material-ui/core';

const SignedInLinks = () => {

   const dispatch = useDispatch();
   const { initials } = useSelector((state: any) => state.firebase.profile);

   const handleLogOut = () => {
      auth.signOut()
         .then(() => {
            dispatch(logout());
         });
   };

   return (
      <ul className='links-list'>
         <li><Link to='/' onClick={handleLogOut}>Log out</Link></li>
         <li><Link to='/'><Avatar>{initials}</Avatar></Link></li>
      </ul>
   );
};

export default SignedInLinks;