import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isFulfilled,
  isPending,
  isRejected,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

import { apiSlice } from './slices/apiSlice';
import authReducer, {
  changeIsAuth,
  changeIsLoading,
} from '../redux/slices/authSlice';
import orgsReducer from '../redux/slices/orgsSlice';
import servicesSlicer from '../redux/slices/servicesSlice';
import softSlicer from '../redux/slices/softSlice';
import errorSlice from '../redux/slices/errorSlice';
import { changeIsServerError } from './slices/errorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  orgs: orgsReducer,
  services: servicesSlicer,
  soft: softSlicer,
  serverError: errorSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejected(action)) {
    api.dispatch(changeIsLoading(false));
    //@ts-ignore
    if (action.payload?.originalStatus === 401 || action.payload?.originalStatus === 403) {
      api.dispatch(changeIsAuth(false));
    }
    //@ts-ignore
    if (action.payload?.status >= 500 && action.payload?.status < 600) {
      api.dispatch(changeIsServerError(true));
    }
  } else if (isFulfilled(action)) {
    api.dispatch(changeIsAuth(true));
    api.dispatch(changeIsLoading(false));
  } else if (isPending(action)) {
    api.dispatch(changeIsLoading(true));
  }

  return next(action);
};

export const test: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
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
        .concat(rtkQueryErrorLogger)
        .concat(test),
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
