import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

type IAuthState = {
    user: {
        email: string,
        firstName?: string,
        lastName?: string
    } | null,
    isAuth: boolean
}

const initialState = {
    user: null,
    isAuth: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: IAuthState, action: PayloadAction<{ email: string }>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state: IAuthState) => {
            state.user = null;
            state.isAuth = false;
        },
        signup: (state: IAuthState, action: PayloadAction<{ email: string, firstName: string, lastName: string }>) => {
            console.log(action);
            state.user = action.payload;
            state.isAuth = true;
        }
    }
});


export const { logout, signup, login } = authSlice.actions;

export const isAuth = (state: RootState) => state.firebase.auth;
export default authSlice.reducer;
