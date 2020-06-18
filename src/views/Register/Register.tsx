import React, { useState } from 'react';
import {
   Button,
   FormControl, FormHelperText,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   TextField
} from '@material-ui/core';
import { MdVisibility, MdVisibilityOff } from 'react-icons/all';
import { Link } from 'react-router-dom';
import './register.scss';
import { useDispatch } from 'react-redux';
import { signup } from 'store/reducers/authReducer';
import { auth, db } from 'firebase/fb.config';
import firebase from 'firebase';


const Register = () => {
   const validEmailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$/);

   const [authError, setAuthError] = useState('');
   const dispatch = useDispatch();

   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      showPassword: false,
      submitted: false,
      errors: { email: '', password: '' }
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      let error;

      switch (name) {
         case 'email':
            error = validEmailRegex.test(value) ? '' : 'Enter valid email address';
            break;
         case 'password':
            error = value.length < 8 ? 'Password must be 8 characters long!' : '';
            break;
         default:
            error = '';
            break;
      }

      setValues({ ...values, [name]: value, errors: { ...values.errors, [name]: error } });
   };

   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const submitForm = (e: React.FormEvent) => {
      const { firstName, lastName, username, email, password } = values;
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
         .then((data: firebase.auth.UserCredential) => {
            console.log(data);
            if (!data.user) return;
            db.collection('users').doc(data.user.uid).set({
               firstName,
               lastName,
               username,
               initials: firstName[0].toUpperCase() + lastName[0].toUpperCase(),
               email
            });
         }).then(() => {
         dispatch(signup({ firstName, lastName, username, email }));
      }).catch(err => {
         console.log(err.message);
         setAuthError(err.message);
      });
   };

   // const emailValidation = (email: string): string => {
   //    if (!email && values.submitted) {
   //       return 'This field is required';
   //    }
   //    return '';
   // };

   return (
      <div className='form-wrapper'>
         <form className='register-form form' onSubmit={submitForm} noValidate>
            <h4 className='form-title'>Register</h4>
            <TextField
               name="firstName"
               variant="outlined"
               required
               fullWidth
               id="firstName"
               label="First Name"
               value={values.firstName}
               onChange={handleChange}
            />
            <TextField
               name="lastName"
               variant="outlined"
               required
               fullWidth
               id="lastName"
               label="Last Name"
               value={values.lastName}
               onChange={handleChange}
            />
            <TextField
               name="username"
               variant="outlined"
               required
               fullWidth
               id="username"
               label="Username"
               value={values.username}
               onChange={handleChange}
            />
            <TextField
               name="email"
               variant="outlined"
               required
               fullWidth
               id="email"
               label="Email Address"
               type='email'
               value={values.email}
               onChange={handleChange}
               helperText={values.errors.email}
            />
            <FormControl variant="outlined" fullWidth required>
               <InputLabel htmlFor="password">Password</InputLabel>
               <OutlinedInput
                  id="password"
                  name='password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
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
               <FormHelperText>{values.errors.password}</FormHelperText>
            </FormControl>
            <span className='required-info'>* this fields are required</span>
            <Button
               type="submit"
               variant="contained"
               color="primary"
               size='large'
            >Sign up</Button>
            <Link to="/login" className='link-to'>
               Already have an account? Sign in
            </Link>
         </form>
         <div className='error-wrapper'> {authError ? <p className='error'> {authError}</p> : null}</div>
      </div>
   );
};

export default Register;