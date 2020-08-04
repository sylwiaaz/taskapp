import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import {
    Button,
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    TextField
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link, RouteComponentProps } from 'react-router-dom';
import './register.scss';
import { useDispatch } from 'react-redux';
import { signup } from 'store/reducers/authReducer';
import { auth, db } from 'firebase/fb.config';
import firebase from 'firebase';
import Alert from 'components/Alert/Alert';


const Register: FunctionComponent<RouteComponentProps> = (): JSX.Element => {

    const validEmailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,}$/);
    const dispatch = useDispatch();

    const [open, setOpenSnackbar] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string>('');
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
        errors: { email: '', password: '', lastName: '', firstName: '' }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        let error;

        switch (name) {
            case 'email':
                error = validEmailRegex.test(value) ? '' : 'Enter valid email address';
                break;
            case 'password':
                error = value.length < 8 ? 'Password must be 8 characters long!' : '';
                break;
            case 'firstName':
            case 'lastName':
                error = value.length < 3 ? 'This field should contain at least 3 characters.' : '';
                break;
            default:
                error = '';
                break;
        }

        setValues({ ...values, [name]: value, errors: { ...values.errors, [name]: error } });
    };

    const handleClose = (event: SyntheticEvent<Element, Event>, reason: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleClickShowPassword = (): void => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    const validateForm = (): boolean => {
        const { firstName, lastName, email, password } = values;
        return (
            firstName.length > 3 &&
            lastName.length > 3 &&
            validEmailRegex.test(email) &&
            password.length > 7);
    }

    const submitForm = (e: React.FormEvent): void => {
        const { firstName, lastName, email, password } = values;
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((data: firebase.auth.UserCredential) => {
                if (!data.user) return;
                db.collection('users').doc(data.user.uid).set({
                    firstName,
                    lastName,
                    initials: firstName[0].toUpperCase() + lastName[0].toUpperCase(),
                    email
                });
            })
            .then(() => {
                dispatch(signup({ firstName, lastName, email }));
            })
            .catch(err => {
                setAuthError(err.message);
                setOpenSnackbar(true);
            });
    };

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
                    helperText={values.errors.firstName}
                    error={!!values.errors.firstName}
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
                    helperText={values.errors.lastName}
                    error={!!values.errors.lastName}
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
                    error={!!values.errors.email}
                />
                <FormControl variant="outlined" fullWidth required error={!!values.errors.password}>
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
                                    {values.showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error>{values.errors.password}</FormHelperText>
                </FormControl>
                <span className='required-info'>* this fields are required</span>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size='large'
                    disabled={!validateForm()}
                >Sign up</Button>
                <Link to="/login" className='link-to'>
                    Already have an account? Sign in
                </Link>
            </form>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">{authError}</Alert>
            </Snackbar>
        </div>
    );
};

export default Register;
