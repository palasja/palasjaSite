import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../withTypes';
import {
  fetchAllOrganizations,
  addOrganisation,
  removeOrg,
  updateOrganisation,
} from '../../helpers/api';
import { FetchStatus, Organization } from '../../helpers/contractTypes';
import { RootState } from '../store';
interface OrganizationState {
  organizations: Organization[];
  chosenOrg: Organization | null;
  changingOrg: Organization | null;
  error: string | null;
  status: FetchStatus;
}
export const fetchOrgs = createAppAsyncThunk('orgs/fetchOrgs', async () => {
  const response = await fetchAllOrganizations();
  return response;
});

export const addOrg = createAppAsyncThunk('orgs/addOrg', async (org: Organization) => {
  const response = await addOrganisation(org);
  return response;
});

export const delOrg = createAppAsyncThunk('orgs/delOrg', async (orgId: number): Promise<number> => {
  const response = await removeOrg(orgId);
  if (!response) throw new Error();
  return orgId;
});

export const editOrg = createAppAsyncThunk(
  'orgs/editOrg',
  async (org: Organization): Promise<Organization> => {
    const response = await updateOrganisation(org);
    if (!response) throw new Error();
    return org;
  }
);

const initialState: OrganizationState = {
  organizations: [],
  chosenOrg: null,
  changingOrg: null,
  error: null,
  status: 'idle',
};

const orgsSlice = createSlice({
  name: 'orgs',
  initialState: initialState,
  reducers: {
    chooseOrg(state, action: PayloadAction<Organization | null>) {
      state.chosenOrg = action.payload;
    },
    changingOrg(state, action: PayloadAction<Organization>) {
      state.changingOrg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = action.payload;
      })
      .addCase(fetchOrgs.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addOrg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations.push(action.payload);
      })
      .addCase(addOrg.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editOrg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const editedOrg = action.payload;
        const org = state.organizations.find((org) => org.id == editedOrg.id);
        if (org) {
          org.name = editedOrg.name;
        }
      })
      .addCase(editOrg.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(delOrg.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = state.organizations.filter((org) => org.id !== action.payload);
        if (action.payload === state.chosenOrg?.id) state.chosenOrg = null;
      })
      .addCase(delOrg.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(delOrg.rejected, (state, _action) => {
        state.status = 'rejected';
        state.error = 'Не удалось удалить организацию';
      });
  },
});

export default orgsSlice.reducer;

export const { chooseOrg, changingOrg } = orgsSlice.actions;
export const getChosenOrganization = (state: RootState) => state.orgs.chosenOrg;
export const getChangingOrganization = (state: RootState) => state.orgs.changingOrg;
export const getAllOrganisation = (state: RootState) => state.orgs.organizations;
export const getOrganisationError = (state: RootState) => state.orgs.error;
export const getOrganisationSatus = (state: RootState) => state.auth.status;
