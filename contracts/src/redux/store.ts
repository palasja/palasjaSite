import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isRejected,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

import { apiSlice } from './slices/apiSlice';
import authReducer, { changeStatus } from '../redux/slices/authSlice';
import orgsReducer from '../redux/slices/orgsSlice';

import servicesSlicer from '../redux/slices/servicesSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  orgs: orgsReducer,
  services: servicesSlicer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejected(action)) {
    //@ts-ignore
    if (action.payload?.originalStatus === 401 && action.payload?.originalStatus === 403) {
      api.dispatch(changeStatus());
    }
  }

  return next(action);
};
export const store = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(createListenerMiddleware().middleware)
        .concat(apiSlice.middleware)
        .concat(rtkQueryErrorLogger),
  });
};
// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = typeof store.dispatch
// // Same for the `RootState` type
// export type RootState1 = ReturnType<typeof store1.getState>

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
