import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { boardReducer } from './reducers/boardReducer';
import sidebarReducer from './reducers/sidebarReducer';
import authReducer from './reducers/authReducer';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import thunk from 'redux-thunk';

export const store = configureStore({
   reducer: {
      board: boardReducer,
      auth: authReducer,
      sidebar: sidebarReducer,
      firebase: firebaseReducer,
      firestore: firestoreReducer
   },
   middleware: [...getDefaultMiddleware({ serializableCheck: false }), thunk.withExtraArgument(getFirebase)]
});

export type RootState = ReturnType<typeof store.getState>

store.subscribe(() => {
   // console.log(store.getState());
});
