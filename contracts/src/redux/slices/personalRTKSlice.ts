import { Personal } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const PersonalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalsByOrgId: builder.query<Personal[], number>({
      query: (orgId) => `getPersonalByOrgId/${orgId}`,
      providesTags: (result) => providesRTKTagList(result, 'Personal'),
    }),
    addPersonal: builder.mutation<Personal, Personal>({
      query: (newPerson) => ({
        url: '/addPersonal',
        method: 'PUT',
        body: JSON.stringify(newPerson),
      }),
      invalidatesTags: [{ type: 'Personal', id: 'LIST' }],
    }),
    updatePersonal: builder.mutation<number, Personal>({
      query: (person) => ({
        url: '/updatePersonal',
        method: 'PATCH',
        body: JSON.stringify(person),
      }),
      // invalidatesTags: ['Personal']
      invalidatesTags: (result, error, arg) => [{ type: 'Personal', id: arg.id }],
    }),
    deletePersonal: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removePersonal/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Personal', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyGetPersonalsByOrgIdQuery,
  useGetPersonalsByOrgIdQuery,
  useAddPersonalMutation,
  useUpdatePersonalMutation,
  useDeletePersonalMutation,
} = PersonalApi;
