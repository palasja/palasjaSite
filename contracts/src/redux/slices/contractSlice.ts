import { createSlice } from "@reduxjs/toolkit";
import { Contract } from "../../helpers/contractTypes";
import { createAppAsyncThunk } from "../../redux/withTypes";
import { addContract as createContract, fetchContractsByOrgId as fetchByOrgId, fetchContractsByOrgIdMonth, removeContract, updateContract } from "../../helpers/api";
import { RootState } from "../../redux/store";

interface ContractsState {
  contracts: Contract[],
  chosenContract: Contract | null
}

export const fetchContractsByOrgId = createAppAsyncThunk('contracts/fetchContracts', async (orgId: number) => {
  const response = await fetchByOrgId(orgId);
  return response;
})

export const fetchContractsByOrgIMonth = createAppAsyncThunk('contracts/fetchContractsByOrgIMonth', async ({orgId, month}:{orgId: number, month: string}) => {
  const response = await fetchContractsByOrgIdMonth(orgId, month);
  return response;
})


export const addContract = createAppAsyncThunk('contracts/addContract', async (contract: Contract) => {
  const response = await createContract(contract);
  return response;
})

export const delContract = createAppAsyncThunk('contracts/delContract', async (contractId: number): Promise<number> => {
  const response = await removeContract(contractId);
  if (!response) throw new Error();
  return contractId;
})

export const editContract = createAppAsyncThunk('contracts/editContract', async (contract: Contract): Promise<Contract> => {
  const response = await updateContract(contract);
  if (!response) throw new Error();
  return contract;
})

const initialState: ContractsState = {
  contracts: [],
  chosenContract: null
};

const contractsSlicer = createSlice({
  name: 'contracts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContractsByOrgId.fulfilled, (state, action) => {
      state.contracts = action.payload
    })
    .addCase(fetchContractsByOrgIMonth.fulfilled, (state, action) => {
      state.chosenContract = action.payload
    })
    .addCase(addContract.fulfilled, (state, action) => {
      state.contracts.push(action.payload);
    })
    .addCase(delContract.fulfilled, (state, action) => {
       state.contracts = state.contracts.filter(con => con.id !== action.payload )
    })
    .addCase(editContract.fulfilled, (state, action) => {
        const editedContract = action.payload;
        const contract = state.contracts.find(con => con.id == editedContract.id)
        if (contract) {
          contract.number = editedContract.number,
          contract.endDate = editedContract.endDate,
          contract.signDate = editedContract.signDate,
          contract.startDate = editedContract.startDate
        }
    })
  }
});

export default contractsSlicer.reducer

export const getAllContracts = (state: RootState) => state.contract.contracts
export const getChoosenContracts = (state: RootState) => state.contract.chosenContract