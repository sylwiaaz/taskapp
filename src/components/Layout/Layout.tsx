import React, { FunctionComponent } from 'react';
import Navbar from './Navbar/Navbar';
import './layout.scss';

const Layout: FunctionComponent<{}> = ({ children }) => {
   return (
      <div className='container'>
         <Navbar/>
         <div className='content-wrapper'>
            {children}
         </div>
      </div>
   );
};

export default Layout;