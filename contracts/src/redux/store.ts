import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/slices/authSlice';
import orgsReducer from '../redux/slices/orgsSlice';
import contractsReducer from '../redux/slices/contractSlice';
import personalsSlicer from '../redux/slices/personalsSlice';
import servicesSlicer from '../redux/slices/servicesSlice';
// import postsReducer from '@/features/posts/postsSlice'
// import use from '../features/users/usersSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    orgs: orgsReducer,
    contract: contractsReducer,
    personals: personalsSlicer,
    services: servicesSlicer,
  })
  // export const store1 = configureStore({
  //   reducer: rootReducer
  // })


export const store = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = typeof store.dispatch
// // Same for the `RootState` type
// export type RootState1 = ReturnType<typeof store1.getState>

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']