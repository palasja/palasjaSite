import { OrgMonth, Service } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const ServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServicesByMonth: builder.query<Service[], string>({
      query: (month) => `getServicesByMonth/${month}`,
      providesTags: (result) => providesRTKTagList(result, 'Service'),
    }),
    getServicesByOrgIdMonth: builder.query<Service[], OrgMonth>({
      query: ({ orgId, month }) => `getServicesByOrgIdMonth/${orgId}/${month}`,
      providesTags: (result) => providesRTKTagList(result, 'Service'),
    }),
    addService: builder.mutation<Service, Service>({
      query: (newService) => ({
        url: '/addService',
        method: 'PUT',
        body: JSON.stringify(newService),
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
    updateService: builder.mutation<number, Service>({
      query: (service) => ({
        url: '/updateService',
        method: 'PATCH',
        body: JSON.stringify(service),
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Service', id: arg.id }],
    }),
    deleteService: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removeService/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyGetServicesByMonthQuery,
  useLazyGetServicesByOrgIdMonthQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = ServiceApi;
