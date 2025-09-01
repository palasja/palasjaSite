import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../redux/withTypes';
import { fetchLogIn, fetchLogOut, fetchSignIn, fetchСheckAuth } from '../../helpers/api';
import { RootState } from '../../redux/store';
import { FetchStatus, User } from '../../helpers/contractTypes';
import { redirect } from 'react-router';

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
