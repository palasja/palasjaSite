import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Contract, Organization } from '../../helpers/contractTypes';
export type { Organization };
const env = import.meta.env;
const API_SERVER: string = env.PROD ? env.VITE_API_SERVER_URL_PROD : env.VITE_API_SERVER_URL_DEV;

const tags = [
  'Organization',
  'Contract',
  'Personal',
  'Service',
  'ServiceCost',
  'SoftInfo',
  'SoftInfoArticle',
  'Price',
  'ServerError',
];

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: tags,
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints: () => ({}),
});
