import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/reducers/authReducer';
import { auth } from 'firebase/fb.config';
import { Avatar } from '@material-ui/core';
import { RootState } from 'store';

const SignedInLinks: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { initials } = useSelector((state: RootState) => state.firebase.profile);

    const handleLogOut = (): void => {
        auth.signOut()
            .then(() => {
                dispatch(logout());
            });
    };

    return (
        <ul className='links-list'>
            <li><Link to='/'><Avatar>{initials}</Avatar></Link></li>
            <li><Link to='/' onClick={handleLogOut} className='auth-btn'>Log out</Link></li>
        </ul>
    );
};

export default SignedInLinks;
