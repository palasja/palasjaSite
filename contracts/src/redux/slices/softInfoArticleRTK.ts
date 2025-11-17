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
      invalidatesTags: ['SoftArticle', { type: 'SoftInfo', id: 'LIST' }]
    }),
    updateSoftArticle: builder.mutation<number, SoftArticle>({
      query: (SoftArticle) => ({
        url: '/updateSoftArticle',
        method: 'PATCH',
        body: JSON.stringify(SoftArticle),
      }),
      invalidatesTags: () => ['SoftArticle', { type: 'SoftInfo', id: 'LIST' }]
    }),
    deleteSoftArticle: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/removeSoftArticle/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SoftArticle', { type: 'SoftInfo', id: 'LIST' }]
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
