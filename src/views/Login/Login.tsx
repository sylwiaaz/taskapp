import React, { useState } from 'react';
import {
   Button,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/all';
import './login.scss';
import { useDispatch } from 'react-redux';
import { auth } from 'firebase/fb.config';
import { login } from 'store/reducers/authReducer';


const Login = () => {

   const dispatch = useDispatch();

   const [authError, setAuthError] = useState<string>('');
   const [values, setValues] = useState({
      password: '',
      showPassword: false,
      email: ''
   });

   const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const handleSubmit = (e: React.FormEvent) => {
      const { password, email } = values;
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
         .then((data) => {
            console.log(data);
            dispatch(login({ password, email }));
         }).catch(err => {
         console.log(err);
         setAuthError(err.message);
      });
   };

   return (
      <div className='form-wrapper'>
         <form className='login-form form' onSubmit={handleSubmit}>
            <h4 className='form-title'>Login</h4>
            <TextField
               name="email"
               variant="outlined"
               required
               fullWidth
               id="email"
               label="Email address"
               value={values.email}
               onChange={handleChange('email')}
            />
            <FormControl variant="outlined" fullWidth required>
               <InputLabel htmlFor="password">Password</InputLabel>
               <OutlinedInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                        >
                           {values.showPassword ? <MdVisibility/> : <MdVisibilityOff/>}
                        </IconButton>
                     </InputAdornment>
                  }
               />
            </FormControl>
            <span className='required-info'>* this fields are required</span>
            <Button
               type="submit"
               variant="contained"
               color="primary"
               size='large'
            >Login</Button>
            <Link to="/register" className='link-to'>
               Don't have an account? Sign Up
            </Link>
         </form>
         <div className='error-wrapper'> {authError ? <p className='error'> {authError}</p> : null}</div>
      </div>
   );
};

export default Login;