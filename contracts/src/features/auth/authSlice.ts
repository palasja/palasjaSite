import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../app/withTypes'
import { fetchLogIn, fetchLogOut, fetchСheckAuth } from '../../helpers/api'
import { RootState } from '../../app/store'
import { User } from '../../helpers/contractTypes'

interface AuthState {
  isAuth: boolean
}
export const login = createAppAsyncThunk('auth/login', async (authInfo: User) => {
  const logInResult = await fetchLogIn(authInfo);
        if (logInResult == 200) {
          //fullfiled
          return true;
        } else {
          //rejected
          throw new Error();
        }
})

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await fetchLogOut().then((status) => {
        if (status == 200) {
          //fullfiled
          return true;
        } else {
          //rejected
          throw new Error();
        }
      })
})

export const check = createAppAsyncThunk('auth/check', async () => {
  await fetchСheckAuth().then((status) => {
      if (status == 200) {
          //fullfiled
          return true;
        } else {
          //rejected
          throw new Error();
        }
      })
})

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addCase(check.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(check.rejected, (state) => {
        state.isAuth = false;
      })
  },
})

export default authSlice.reducer

export const getIsAuth = (state: RootState) => state.auth.isAuth
// export const selectCurrentUsername = (state: RootState) => state.auth.isAuth

