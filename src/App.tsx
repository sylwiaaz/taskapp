import React, { FunctionComponent } from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';
import AuthIsLoaded from './components/AuthIsLoaded/AuthIsLoaded';
import Layout from './components/Layout/Layout';
import PublicRoute from './components/Routes/PublicRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Home from './views/Home/Home';
import Board from './views/Board/Board';
import { isAuth } from 'store/reducers/authReducer';


export const App: FunctionComponent = (): JSX.Element => {

   const auth = useSelector(isAuth);
   const isAuthUser = !!auth.uid;

   return (
       <div className="App">
          <HashRouter basename='/taskapp'>
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
          </HashRouter>
       </div>
   );
};
export default App;
