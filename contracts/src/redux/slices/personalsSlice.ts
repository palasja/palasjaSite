import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, Personal } from '../../helpers/contractTypes';
import { createAppAsyncThunk } from '../../redux/withTypes';
import {
  addPerson,
  fetchPersonalsByOrgId as fetchByOrgId,
  removePerson,
  updatePerson,
} from '../../helpers/api';
import { RootState } from '../../redux/store';
import { AuthError } from '../../helpers/authError';
import { changeStatus } from './authSlice';

interface PersonalsState {
  personals: Personal[];
  changingPersonal: Personal | null;
  status: FetchStatus;
}

export const fetchPersonalsByOrgId = createAppAsyncThunk(
  'personals/fetchPersonal',
  async (orgId: number, {dispatch}) => {
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
  },
      {
        condition(arg, thunkApi) {
          const status = getPersonalSatus(thunkApi.getState())
    
          if ( status === 'pending' ) {
            return false
          }
        }
      }
);

export const createPersonal = createAppAsyncThunk(
  'personals/addPerson',
  async (person: Personal, {dispatch}) => {
    try {
      const response = await addPerson(person);
      return response;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await addPerson(person);
    // return response;
  }
);

export const delPerson = createAppAsyncThunk(
  'personals/removePerson',
  async (contractId: number, {dispatch}): Promise<number> => {
    try {
      await removePerson(contractId);
      return contractId;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await removePerson(contractId);
    // if (!response) throw new Error();
    // return contractId;
  }
);

export const editPerson = createAppAsyncThunk(
  'personals/updatePerson',
  async (person: Personal, {dispatch}): Promise<Personal> => {
    try {
      await updatePerson(person);
      return person;
    } catch (err) {
      if (err instanceof AuthError) {
        dispatch(changeStatus());
      }
      throw err;
    }
    // const response = await updatePerson(person);
    // if (!response) throw new Error();
    // return person;
  }
);

const initialState: PersonalsState = {
  personals: [],
  changingPersonal: null,
  status: 'idle',
};

const personalsSlicer = createSlice({
  name: 'personals',
  initialState: initialState,
  reducers: {
    changingPersonal(state, action: PayloadAction<Personal>) {
      state.changingPersonal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalsByOrgId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.personals = action.payload;
      })
      .addCase(fetchPersonalsByOrgId.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createPersonal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.personals.push(action.payload);
      })
      .addCase(createPersonal.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(delPerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.personals = state.personals.filter((p) => p.id !== action.payload);
      })
      .addCase(delPerson.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editPerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const editedPerson = action.payload;
        const person = state.personals.find((p) => p.id == editedPerson.id);
        if (person) {
          (person.firstName = editedPerson.firstName),
            (person.firstNameR = editedPerson.firstNameR),
            (person.lastName = editedPerson.lastName),
            (person.lastNameR = editedPerson.lastNameR),
            (person.middleName = editedPerson.middleName),
            (person.middleNameR = editedPerson.middleNameR),
            (person.positionName = editedPerson.positionName),
            (person.isHead = editedPerson.isHead);
        }
      })
      .addCase(editPerson.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export default personalsSlicer.reducer;

export const { changingPersonal } = personalsSlicer.actions;
export const getAllPersonals = (state: RootState) => state.personals.personals;
export const getChangingPersonals = (state: RootState) => state.personals.changingPersonal;
export const getPersonalSatus = (state: RootState) => state.personals.status;
export const isPersonalLoading = (state: RootState) => state.personals.status === 'pending';
