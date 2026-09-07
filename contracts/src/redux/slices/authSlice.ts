import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { FetchStatus } from '../../helpers/contractTypes';
interface AuthState {
  authErrorMessage: string | null;
  status: FetchStatus;
  isAuth: boolean | undefined;
  isLoading: boolean;
  isCheked: boolean;
}
const initialState: AuthState = {
  authErrorMessage: null,
  status: 'idle',
  isAuth: undefined,
  isLoading: false,
  isCheked: false,
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
    changeIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    changeIsCheked(state, action: PayloadAction<boolean>) {
      state.isCheked = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { changeStatus, changeIsAuth, changeIsLoading, changeIsCheked } = authSlice.actions;
export const getAuthErrorMessage = (state: RootState) => state.auth.authErrorMessage;
export const getAuthSatus = (state: RootState) => state.auth.status;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getIsLoading = (state: RootState) => state.auth.isLoading;
export const getIsChecked = (state: RootState) => state.auth.isCheked;

