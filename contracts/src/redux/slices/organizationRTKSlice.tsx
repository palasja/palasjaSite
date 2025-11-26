import { createEntityAdapter } from '@reduxjs/toolkit';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice, Organization } from './apiSlice';

const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<Organization[], void>({
      query: () => '/getOrganizations',
      providesTags: (result) => providesRTKTagList(result, 'Organization'),
      transformResponse: (response: Organization[]) => {
        response.push({ id: 0, name: 'Без Организации' });
        return response;
      },
    }),
    addOrganization: builder.mutation<Organization, Organization>({
      query: (newOrg) => ({
        url: '/addOrganization',
        method: 'PUT',
        body: JSON.stringify(newOrg),
      }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
    updateOrganization: builder.mutation<number, Organization>({
      query: (org) => ({
        url: '/updateOrganization',
        method: 'PATCH',
        body: JSON.stringify(org),
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Organization', id: arg.id }],
    }),
    deleteOrganization: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removeOrganization/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useAddOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
