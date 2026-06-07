import { Price } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const priceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrice: builder.query<Price[], void>({
      query: () => '/getPrice',
      providesTags: (result) => providesRTKTagList(result, 'Price'),
    }),
    addPrice: builder.mutation<Price, Price>({
      query: (price) => ({
        url: '/addPrice',
        method: 'PUT',
        body: JSON.stringify(price),
      }),
      invalidatesTags: [{ type: 'Price', id: 'LIST' }],
    }),
    updatePrice: builder.mutation<number, Price>({
      query: (price) => ({
        url: '/updatePrice',
        method: 'PATCH',
        body: JSON.stringify(price),
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Price', id: arg.id }],
    }),
    deletePrice: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removePrice/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Price', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPriceQuery,
  useLazyGetPriceQuery,
  useAddPriceMutation,
  useUpdatePriceMutation,
  useDeletePriceMutation,
} = priceAPI;
