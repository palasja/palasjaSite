import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/slices/authSlice';
import orgsReducer from './slices/orgsSlice';
import contractsReducer from '../redux/slices/contractSlice';
import personalsSlicer from '../redux/slices/personalsSlice';
import servicesSlicer from '../redux/slices/servicesSlice';
// import postsReducer from '@/features/posts/postsSlice'
// import use from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orgs: orgsReducer,
    contract: contractsReducer,
    personals: personalsSlicer,
    services: servicesSlicer,
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
