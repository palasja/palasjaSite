import {
  MonthYear,
  Organization,
  OrgMonthPayment,
  Service,
  ServiceCost,
} from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const ServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServicesByMonth: builder.query<Service[], MonthYear>({
      query: ({ month, year }) => `getServicesByMonth/${month}/${year}`,
      providesTags: (result) => providesRTKTagList(result, 'Service'),
    }),
    getServicesByOrgIdMonthYear: builder.query<Service[], OrgMonthPayment>({
      query: ({ orgId, month, year, isPaid = false }) => {
        return isPaid
          ? `getServicesByOrgIdMonth/${orgId}/${month}/${year}`
          : `getServicesUnpaidByOrgId/${orgId}`;
      },
      providesTags: (result) => providesRTKTagList(result, 'Service'),
    }),
    getServicesCost: builder.query<ServiceCost[], void>({
      query: () => `getServicesCost`,
      providesTags: (result) => providesRTKTagList(result, 'ServiceCost'),
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
    toPaidService: builder.mutation<boolean, number[]>({
      query: (idArr) => ({
        url: `/servicesToPaid`,
        method: 'PATCH',
        body: JSON.stringify(idArr),
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
    toUnpaidService: builder.mutation<boolean, number[]>({
      query: (idArr) => ({
        url: `/servicesToUnpaid`,
        method: 'PATCH',
        body: JSON.stringify(idArr),
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetServicesByOrgIdMonthYearQuery,
  useLazyGetServicesByMonthQuery,
  useLazyGetServicesByOrgIdMonthYearQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useLazyGetServicesCostQuery,
  useToPaidServiceMutation,
  useToUnpaidServiceMutation,
} = ServiceApi;
