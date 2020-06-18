import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,
   isAuth: false,
   authError: null
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload;
         state.isAuth = true;
      },
      logout: (state) => {
         state.user = null;
         state.isAuth = false;
      },
      signup: (state, action) => {
         state.user = action.payload;
         state.isAuth = true;
      }
   }
});


export const { logout, signup, login } = authSlice.actions;


export const selectCurrentUser = (state: { auth: { user: {}, isAuth: boolean } }) => state.auth.user;
export const isAuth = (state: any) => state.firebase.auth;


export default authSlice.reducer;