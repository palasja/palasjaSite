import { createSlice } from "@reduxjs/toolkit";
import { Personal } from "../../helpers/contractTypes";
import { createAppAsyncThunk } from "../../redux/withTypes";
import { addPerson, fetchPersonalsByOrgId as fetchByOrgId, removePerson, updatePerson} from "../../helpers/api";
import { RootState } from "../../redux/store";

interface PersonalsState {
  personals: Personal[]
}

export const fetchPersonalsByOrgId = createAppAsyncThunk('personals/fetchPersonal', async (orgId: number) => {
  const response = await fetchByOrgId(orgId);
  return response;
})

export const createPersonal = createAppAsyncThunk('personals/addPerson', async (person: Personal) => {
  const response = await addPerson(person);
  return response;
})

export const delPerson = createAppAsyncThunk('personals/removePerson', async (contractId: number): Promise<number> => {
  const response = await removePerson(contractId);
  if (!response) throw new Error();
  return contractId;
})

export const editPerson = createAppAsyncThunk('personals/updatePerson', async (person: Personal): Promise<Personal> => {
  const response = await updatePerson(person);
  if (!response) throw new Error();
  return person;
})

const initialState: PersonalsState = {
  personals: [],
};

const personalsSlicer = createSlice({
  name: 'personals',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalsByOrgId.fulfilled, (state, action) => {
      state.personals = action.payload
    })
    .addCase(createPersonal.fulfilled, (state, action) => {
      state.personals.push(action.payload);
    })
    .addCase(delPerson.fulfilled, (state, action) => {
       state.personals = state.personals.filter(p => p.id !== action.payload )
    })
    .addCase(editPerson.fulfilled, (state, action) => {
        const editedPerson = action.payload;
        const person = state.personals.find(p => p.id == editedPerson.id)
        if (person) {
          person.firstName = editedPerson.firstName,
          person.firstNameR = editedPerson.firstNameR,
          person.lastName = editedPerson.lastName,
          person.lastNameR = editedPerson.lastNameR,
          person.middleName = editedPerson.middleName,
          person.middleNameR = editedPerson.middleNameR,
          person.positionName = editedPerson.positionName,
          person.isHead = editedPerson.isHead
        }
    })
  }
});

export default personalsSlicer.reducer

export const getAllPersonals = (state: RootState) => state.personals.personals