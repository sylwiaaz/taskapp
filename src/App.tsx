import React, { FunctionComponent } from 'react';
import './App.scss';
import Board from './views/Board/Board';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from 'components/Routes/ProtectedRoute';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import PublicRoute from 'components/Routes/PublicRoute';
import AuthIsLoaded from 'components/AuthIsLoaded/AuthIsLoaded';
import { useSelector } from 'react-redux';
import { isAuth } from 'store/reducers/authReducer';
import { Home } from './views/Home/Home';


export const App: FunctionComponent = (): JSX.Element => {

   const auth = useSelector(isAuth);
   const isAuthUser = !!auth.uid;

   return (
      <div className="App">
         <BrowserRouter>
            <AuthIsLoaded>
               <Layout>
                  <Switch>
                     <PublicRoute component={Login} path='/login' exact isAuth={isAuthUser}/>
                     <PublicRoute component={Register} path='/register' exact isAuth={isAuthUser}/>
                     <ProtectedRoute component={Home} path='/' exact isAuth={isAuthUser}/>
                     <ProtectedRoute component={Board} path='/board/:boardID' exact isAuth={isAuthUser}/>
                  </Switch>
               </Layout>
            </AuthIsLoaded>
         </BrowserRouter>
      </div>
   );
};

export default App;
