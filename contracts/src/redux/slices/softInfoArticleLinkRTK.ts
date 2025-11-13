import { SoftArticleLink as SoftArticleLinkLink } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const SoftArticleLinkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSoftArticleLinks: builder.query<SoftArticleLinkLink[], string>({
      query: (id) => `/getSoftArticleLinksByArticleId/${id}`,
      providesTags: (result) => providesRTKTagList(result, 'SoftArticleLink'),
    }),
    addSoftArticleLinks: builder.mutation<SoftArticleLinkLink[], SoftArticleLinkLink[]>({
      query: (newSoftArticleLinks) => ({
        url: '/addSoftArticleLinks',
        method: 'PUT',
        body: JSON.stringify(newSoftArticleLinks),
      }),

      invalidatesTags: [{ type: 'SoftArticleLink', id: 'LIST' }],
    }),
    updateSoftArticleLink: builder.mutation<number, SoftArticleLinkLink[]>({
      query: (softArticleLink) => ({
        url: '/updateArticleLinks',
        method: 'PATCH',
        body: JSON.stringify(softArticleLink),
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'SoftArticleLink' }],
    }),
    deleteSoftArticleLink: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/removeSoftArticleLink/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'SoftArticleLink', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSoftArticleLinksQuery,
  useLazyGetSoftArticleLinksQuery,
  useAddSoftArticleLinksMutation,
  useUpdateSoftArticleLinkMutation,
  useDeleteSoftArticleLinkMutation,
} = SoftArticleLinkApi;
