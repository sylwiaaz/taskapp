import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Redirect, Route } from 'react-router-dom';


interface IProps {
   component: (props: RouteComponentProps) => JSX.Element | null,
   path: string,
   exact: boolean,
   isAuth?: boolean
}

const ProtectedRoute: FunctionComponent<IProps> = ({ component: Component, isAuth, ...rest }) => {

   return (
      <Route {...rest} render={(props) => isAuth ? <Component {...props}/> : <Redirect to='/login'/>}/>
   );
};

export default ProtectedRoute;