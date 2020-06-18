import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
   return (
      <ul className='links-list'>
         <li><Link to='/register'>Sign up</Link></li>
         <li><Link to='/login'>Log in</Link></li>
      </ul>
   )
};

export default SignedOutLinks;