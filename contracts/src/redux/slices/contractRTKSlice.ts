import {
  Contract,
  ContractScan,
  ContractWithFile,
  OrgMonthPayment,
} from '../../helpers/contractTypes';
import { providesRTKTagList } from '../../helpers/helper';
import { apiSlice } from './apiSlice';

const contractApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContractsByOrg: builder.query<Contract[], number>({
      query: (orgId) => `/getContractsByOrg/${orgId}`,
      providesTags: (result) => providesRTKTagList(result, 'Contract'),
    }),
    getContractsByOrgIdMonthYear: builder.query<Contract, OrgMonthPayment>({
      query: ({ orgId, month, year }) => `getContractByOrgIdMonth/${orgId}/${month}/${year}`,
    }),
    getContractsScan: builder.query<{ scan: string }, ContractScan>({
      query: ({ fileName }) => `/contractScan/${fileName}`,
    }),
    addContract: builder.mutation<Contract, ContractWithFile>({
      query: (newContract) => ({
        url: '/addContracts',
        method: 'PUT',
        body: JSON.stringify(newContract),
      }),
      invalidatesTags: [{ type: 'Contract', id: 'LIST' }],
    }),
    updateContract: builder.mutation<number, ContractWithFile>({
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
  useLazyGetContractsByOrgIdMonthYearQuery,
  useAddContractMutation,
  useDeleteContractMutation,
  useUpdateContractMutation,
  useLazyGetContractsScanQuery,
} = contractApi;
