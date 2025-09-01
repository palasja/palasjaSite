import { Contract } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice, Organization } from './apiSlice';

const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<Organization[], void>({
      query: () => '/getOrganizations',
      // providesTags: ['Organization']
      providesTags: (result) => providesRTKTagList(result, 'Organization'),
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
      // invalidatesTags: ['Organization']
      invalidatesTags: (result, error, arg) => [{ type: 'Organization', id: arg.id }],
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
