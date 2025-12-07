import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { FetchStatus } from '../../helpers/contractTypes';
import { redirect } from 'react-router';
interface AuthState {
  authErrorMessage: string | null;
  status: FetchStatus;
  isAuth: boolean;
}
const initialState: AuthState = {
  authErrorMessage: null,
  status: 'idle',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatus(state) {
      state.status = 'rejected';
    },
    changeIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      // if(!action.payload){
      //   redirect("/");
      // }
    },
  },
});

export default authSlice.reducer;

export const { changeStatus, changeIsAuth } = authSlice.actions;
export const getAuthErrorMessage = (state: RootState) => state.auth.authErrorMessage;
export const getAuthSatus = (state: RootState) => state.auth.status;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
