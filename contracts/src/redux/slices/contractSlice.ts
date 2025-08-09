import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract, FetchStatus } from '../../helpers/contractTypes';
import { createAppAsyncThunk } from '../../redux/withTypes';
import {
  addContract as createContract,
  fetchContractsByOrgId as fetchByOrgId,
  fetchContractsByOrgIdMonth,
  removeContract,
  updateContract,
} from '../../helpers/api';
import { RootState } from '../../redux/store';
import { AuthError } from '../../helpers/authError';

interface ContractsState {
  contracts: Contract[];
  chosenContract: Contract | null;
  changingContract: Contract | null;
  status: FetchStatus;
}

export const fetchContractsByOrgId = createAppAsyncThunk(
  'contracts/fetchContracts',
  async (orgId: number) => {
    try {
      const response = await fetchByOrgId(orgId);
      return response;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await fetchByOrgId(orgId);
    // return response;
  }
);

export const fetchContractsByOrgIMonth = createAppAsyncThunk(
  'contracts/fetchContractsByOrgIMonth',
  async ({ orgId, month }: { orgId: number; month: string }) => {
    try {
      const response = await fetchContractsByOrgIdMonth(orgId, month);
      return response;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await fetchContractsByOrgIdMonth(orgId, month);
    // return response;
  }
);

export const addContract = createAppAsyncThunk(
  'contracts/addContract',
  async (contract: Contract) => {
    try {
      const response = await createContract(contract);
      return response;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await createContract(contract);
    // return response;
  }
);

export const delContract = createAppAsyncThunk(
  'contracts/delContract',
  async (contractId: number): Promise<number> => {
    try {
      const response = await removeContract(contractId);
      return contractId;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await removeContract(contractId);
    // if (!response) throw new Error();
    // return contractId;
  }
);

export const editContract = createAppAsyncThunk(
  'contracts/editContract',
  async (contract: Contract): Promise<Contract> => {
    try {
      const response = await updateContract(contract);
      return contract;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await updateContract(contract);
    // if (!response) throw new Error();
    // return contract;
  }
);

const initialState: ContractsState = {
  contracts: [],
  chosenContract: null,
  changingContract: null,
  status: 'idle',
};

const contractsSlicer = createSlice({
  name: 'contracts',
  initialState: initialState,
  reducers: {
    changingContract(state, action: PayloadAction<Contract>) {
      state.changingContract = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractsByOrgId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contracts = action.payload;
      })
      .addCase(fetchContractsByOrgId.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchContractsByOrgIMonth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chosenContract = action.payload;
      })
      .addCase(fetchContractsByOrgIMonth.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addContract.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contracts.push(action.payload);
      })
      .addCase(addContract.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(delContract.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contracts = state.contracts.filter((con) => con.id !== action.payload);
      })
      .addCase(delContract.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editContract.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const editedContract = action.payload;
        const contract = state.contracts.find((con) => con.id == editedContract.id);
        if (contract) {
          (contract.number = editedContract.number),
            (contract.endDate = editedContract.endDate),
            (contract.signDate = editedContract.signDate),
            (contract.startDate = editedContract.startDate);
        }
      })
      .addCase(editContract.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export default contractsSlicer.reducer;

export const { changingContract } = contractsSlicer.actions;
export const getAllContracts = (state: RootState) => state.contract.contracts;
export const getChoosenContracts = (state: RootState) => state.contract.chosenContract;
export const getChangingContract = (state: RootState) => state.contract.changingContract;
export const getContractSatus = (state: RootState) => state.contract.status;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

function changeStatus(): any {
  throw new Error('Function not implemented.');
}
