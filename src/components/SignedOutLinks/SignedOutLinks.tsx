import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks: FunctionComponent = () => {
    return (
        <ul className='links-list'>
            <li><Link to='/register' className="auth-btn">Sign up</Link></li>
            <li><Link to='/login' className="auth-btn">Log in</Link></li>
        </ul>
    )
};

export default SignedOutLinks;
