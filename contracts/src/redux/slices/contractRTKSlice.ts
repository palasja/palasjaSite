import { Contract, ContractScan, OrgMonthPayment } from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const contractApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContractsByOrg: builder.query<Contract[], number>({
      query: (orgId) => `/getContractsByOrg/${orgId}`,
      providesTags: (result) => providesRTKTagList(result, 'Contract'),
    }),
    getContractsByOrgIdMonth: builder.query<Contract, OrgMonthPayment>({
      query: ({ orgId, month }) => `getContractByOrgIdMonth/${orgId}/${month}`,
    }),
    getContractsScan: builder.query<{ scan: string }, ContractScan>({
      query: ({ orgId }) => `/contractScan/${orgId}`,
    }),
    addContract: builder.mutation<Contract, Contract>({
      query: (newContract) => ({
        url: '/addContracts',
        method: 'PUT',
        body: JSON.stringify(newContract),
      }),
      invalidatesTags: [{ type: 'Contract', id: 'LIST' }],
    }),
    updateContract: builder.mutation<number, Contract>({
      query: (contract) => ({
        url: '/updateContract',
        method: 'PATCH',
        body: JSON.stringify(contract),
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Contract', id: arg.id }],
    }),
    deleteContract: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/removeContract/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contract', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetContractsByOrgQuery,
  useLazyGetContractsByOrgIdMonthQuery,
  useAddContractMutation,
  useDeleteContractMutation,
  useUpdateContractMutation,
  useLazyGetContractsScanQuery,
} = contractApi;
