import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from '../withTypes';
import { FetchStatus, Organization, OrgInfo, OrgInfoAction } from '../../helpers/contractTypes';
import { RootState } from '../store';

interface OrganizationState {
  chosenOrg: Organization | null;
  changingOrg: Organization | null;
  error: string | null;
  status: FetchStatus;
  chosenInfo: OrgInfo;
  chosenAction: OrgInfoAction;
}

const initialState: OrganizationState = {
  chosenOrg: null,
  changingOrg: null,
  error: null,
  chosenInfo: null,
  chosenAction: 'show',
  status: 'idle',
};

const orgsSlice = createSlice({
  name: 'orgs',
  initialState: initialState,
  reducers: {
    chooseOrg(state, action: PayloadAction<Organization | null>) {
      state.chosenOrg = action.payload;
    },
    changingOrg(state, action: PayloadAction<Organization | null>) {
      state.changingOrg = action.payload;
    },
    choseInfo(state, action: PayloadAction<OrgInfo>) {
      state.chosenInfo = action.payload;
    },
    choseAct(state, action: PayloadAction<OrgInfoAction>) {
      state.chosenAction = action.payload;
    },
  },
});

export default orgsSlice.reducer;

export const { chooseOrg, changingOrg, choseInfo, choseAct } = orgsSlice.actions;
export const getChosenOrganization = (state: RootState) => state.orgs.chosenOrg;
export const getChangingOrganization = (state: RootState) => state.orgs.changingOrg;
export const getOrganisationError = (state: RootState) => state.orgs.error;
export const getOrganisationSatus = (state: RootState) => state.orgs.status;
export const getChosenInfo = (state: RootState) => state.orgs.chosenInfo;
export const getChosenchosenAction = (state: RootState) => state.orgs.chosenAction;
export const isOrgLoading = (state: RootState) => state.orgs.status === 'pending';
