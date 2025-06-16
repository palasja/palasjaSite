import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../app/withTypes";
import { fetchAllOrganizations, addOrganisation, removeOrg, updateOrganisation  } from "../../helpers/api";
import { Organization } from "../../helpers/contractTypes";
import { RootState } from '../../app/store'
interface OrganizationState {
  organizations:  Organization[],
  error: string | null
}
export const fetchOrgs = createAppAsyncThunk('orgs/fetchOrgs', async () => {
  const response = await fetchAllOrganizations();
  return response;
})

export const addOrg = createAppAsyncThunk('orgs/addOrg', async (org: Organization) => {
  const response = await addOrganisation(org);
  return response;
})

export const delOrg = createAppAsyncThunk('orgs/delOrg', async (orgId: string): Promise<string> => {
  const response = await removeOrg(orgId);
  if (!response) throw new Error();
  return orgId;
})

export const editOrg = createAppAsyncThunk('orgs/editOrg', async (org: Organization): Promise<Organization> => {
  const response = await updateOrganisation(org);
  if (!response) throw new Error();
  return org;
})

const initialState: OrganizationState = {
  organizations: [],
  error: null
};

const orgsSlice = createSlice({
  name: 'orgs',
  initialState: initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.organizations = action.payload
      })
      .addCase(addOrg.fulfilled, (state, action) => {
        state.organizations.push(action.payload);
      })
      .addCase(editOrg.fulfilled, (state, action) => {
        const editedOrg = action.payload
        const org = state.organizations.find(org => org.id == editedOrg.id)
        if (org) {
          org.name = editedOrg.name
        }
      })
      .addCase(delOrg.fulfilled, (state, action) =>{
        state.organizations = state.organizations.filter(org => org.id !== action.payload )
      })
      .addCase(delOrg.rejected, (state, _action) =>{
        state.error = 'Не удалось удулить организацию';
      })
  }
});

export default orgsSlice.reducer;

export const getAllOrganisation = (state: RootState) => state.orgs.organizations
export const getOrganisationError = (state: RootState) => state.orgs.error