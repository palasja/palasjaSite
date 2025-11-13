import { SoftInfo } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const softInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSoftInfo: builder.query<SoftInfo[], void>({
      query: () => '/getSoftInfo',
      providesTags: (result) => providesRTKTagList(result, 'SoftInfo'),
    }),
    addSoftInfo: builder.mutation<SoftInfo, SoftInfo>({
      query: (newSoftInfo) => ({
        url: '/addSoftInfo',
        method: 'PUT',
        body: JSON.stringify(newSoftInfo),
      }),
      invalidatesTags: [{ type: 'SoftInfo', id: 'LIST' }],
    }),
    updateSoftInfo: builder.mutation<number, SoftInfo>({
      query: (SoftInfo) => ({
        url: '/updateSoftInfo',
        method: 'PATCH',
        body: JSON.stringify(SoftInfo),
      }),
      // invalidatesTags: ['Organization']
      invalidatesTags: (_result, _error, arg) => [{ type: 'SoftInfo', id: arg.id }],
    }),
    deleteSoftInfo: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removeSoftInfo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'SoftInfo', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSoftInfoQuery,
  useAddSoftInfoMutation,
  useUpdateSoftInfoMutation,
  useDeleteSoftInfoMutation,
} = softInfoApi;
