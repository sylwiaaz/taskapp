import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

interface IProps {
   component: (props: RouteComponentProps) => JSX.Element | null,
   path: string,
   exact: boolean,
   isAuth?: boolean
}

const PublicRoute: FunctionComponent<IProps> = ({ component: Component, isAuth, ...rest }) => {
   return (
       <Route {...rest} render={(props) => isAuth ? <Redirect to='/'/> : <Component {...props}/>}/>
   );
};

export default PublicRoute;
