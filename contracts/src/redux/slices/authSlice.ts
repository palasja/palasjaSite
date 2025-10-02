import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { FetchStatus } from '../../helpers/contractTypes';

interface AuthState {
  authErrorMessage: string | null;
  status: FetchStatus;
}
const initialState: AuthState = {
  authErrorMessage: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatus(state) {
      state.status = 'rejected';
    },
  },
});

export default authSlice.reducer;

export const { changeStatus } = authSlice.actions;
export const getAuthErrorMessage = (state: RootState) => state.auth.authErrorMessage;
export const getAuthSatus = (state: RootState) => state.auth.status;
