import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { boardReducer, columnsReducer, notesReducer } from './reducers/boardReducer';
import authReducer from './reducers/authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const reducers = combineReducers({
   boards: boardReducer,
   columns: columnsReducer,
   notes: notesReducer,
   auth: authReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer
})

const store = configureStore({
   reducer: reducers,
   middleware: [...getDefaultMiddleware({ serializableCheck: false })]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, any, Action>;

export { store };
