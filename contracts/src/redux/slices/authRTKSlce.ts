import { url } from 'inspector';
import { User } from '../../helpers/contractTypes';
import { apiSlice } from './apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<string, User>({
      query: (user) => ({
        url: '/logIn',
        method: 'POST',
        body: JSON.stringify(user),
        responseHandler: 'text',
        validateStatus: (response) => {
          return response.status === 200;
        },
      }),
    }),
    logout: builder.query<string, void>({
      query: () => ({
        url: '/logout',
        responseHandler: 'text',
        validateStatus: (response) => {
          return response.status === 200;
        },
      }),
    }),
    signin: builder.query<string, User>({
      query: (user) => ({
        url: '/signIn',
        method: 'POST',
        responseHandler: 'text',
        body: JSON.stringify(user),
        validateStatus: (response) => {
          return response.status === 200;
        },
      }),
    }),
    check: builder.query<string, void>({
      query: () => ({
        url: '/checkAuth',
        method: 'POST',
        responseHandler: 'text',
        validateStatus: (response) => {
          return response.status === 200;
        },
      }),
    }),
  }),
});

export const {
  useLazySigninQuery,
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useLazyCheckQuery,
  useLogoutQuery,
  // useCheckQuery,
} = authApi;
