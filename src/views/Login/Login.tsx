import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import {
   Button,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   TextField,
   Snackbar
} from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';
import { auth } from 'firebase/fb.config';
import { login } from 'store/reducers/authReducer';
import Alert from 'components/Alert/Alert';


const Login: FunctionComponent<RouteComponentProps> = (): JSX.Element => {

   const dispatch = useDispatch();

   const [authError, setAuthError] = useState<string>('');
   const [open, setOpenSnackbar] = useState(false);
   const [values, setValues] = useState({
      password: '',
      showPassword: false,
      email: ''
   });

   const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = (): void => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
   };

   const handleClose = (event: SyntheticEvent<Element, Event>, reason: string): void => {
      if (reason === 'clickaway') {
         return;
      }
      setOpenSnackbar(false);
   };

   const handleSubmit = (e: React.FormEvent): void => {
      const { password, email } = values;
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
          .then(() => {
             dispatch(login({ email }));
          })
          .catch(err => {
             setAuthError(err.message);
             setOpenSnackbar(true);
          });
   };

   const validateForm = (): boolean => {
      const { email, password } = values;
      return (!!email && password.length > 7);
   }

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
                              edge="end">
                             {values.showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                          </IconButton>
                       </InputAdornment>}
                />
             </FormControl>
             <span className='required-info'>* this fields are required</span>
             <Button
                 type="submit"
                 variant="contained"
                 color="primary"
                 size='large'
                 disabled={!validateForm()}>
                Login
             </Button>
             <Link to="/register" className='link-to'>
                Don't have an account? Sign Up
             </Link>
          </form>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="error">{authError}</Alert>
          </Snackbar>
       </div>
   );
};

export default Login;
