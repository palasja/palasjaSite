import { SoftArticle } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const softArticleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSoftArticle: builder.query<SoftArticle, string>({
      query: (id) => `/getSoftArticle/${id}`,
      providesTags: ['SoftArticle'],
    }),
    addSoftArticle: builder.mutation<SoftArticle, SoftArticle>({
      query: (newSoftArticle) => ({
        url: '/addSoftArticle',
        method: 'PUT',
        body: JSON.stringify(newSoftArticle),
      }),
      invalidatesTags: [{ type: 'SoftInfo', id: 'LIST' }],
      // invalidatesTags: (_result, _error, arg) => [{ type: 'SoftInfo', id: arg.id }, { type: 'SoftArticle', id: 'LIST' }]
    }),
    updateSoftArticle: builder.mutation<number, SoftArticle>({
      query: (SoftArticle) => ({
        url: '/updateSoftArticle',
        method: 'PATCH',
        body: JSON.stringify(SoftArticle),
      }),
      // invalidatesTags: ['Organization']
      invalidatesTags: (_result, _error, arg) => [{ type: 'SoftArticle', id: arg.id }],
    }),
    deleteSoftArticle: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/removeSoftArticle/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'SoftArticle', id: 'LIST' },
        { type: 'SoftInfo', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetSoftArticleQuery,
  useLazyGetSoftArticleQuery,
  useAddSoftArticleMutation,
  useUpdateSoftArticleMutation,
  useDeleteSoftArticleMutation,
} = softArticleApi;
