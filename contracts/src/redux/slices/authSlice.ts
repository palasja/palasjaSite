import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../redux/withTypes';
import { fetchLogIn, fetchLogOut, fetchSignIn, fetchСheckAuth } from '../../helpers/api';
import { RootState } from '../../redux/store';
import { User } from '../../helpers/contractTypes';

interface AuthState {
  isAuth: boolean;
  isErrorAuth: boolean;
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
});

export const signin = createAppAsyncThunk('auth/signin', async (authInfo: User) => {
  const logInResult = await fetchSignIn(authInfo);
  if (logInResult == 200) {
    //fullfiled
    return true;
  } else {
    //rejected
    throw new Error();
  }
});

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await fetchLogOut().then((status) => {
    if (status == 200) {
      //fullfiled
      return true;
    } else {
      //rejected
      throw new Error();
    }
  });
});

export const check = createAppAsyncThunk('auth/check', async (): Promise<boolean> => {
  const res = await fetchСheckAuth();
  if (res !== 200) throw new Error();
  return true;
});

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  isAuth: false,
  isErrorAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
        state.isErrorAuth = false;
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
        state.isErrorAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addCase(signin.fulfilled, (state) => {
        state.isAuth = true;
        state.isErrorAuth = false;
      })
      .addCase(check.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(check.rejected, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getIsErrorAuth = (state: RootState) => state.auth.isErrorAuth;
// export const selectCurrentUsername = (state: RootState) => state.auth.isAuth
