import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../redux/withTypes';
import { fetchLogIn, fetchLogOut, fetchSignIn, fetchСheckAuth } from '../../helpers/api';
import { RootState } from '../../redux/store';
import { FetchStatus, User } from '../../helpers/contractTypes';
import { redirect } from 'react-router';

interface AuthState {
  // isAuth: boolean;
  authErrorMessage: string | null;
  status: FetchStatus;
}
export const login = createAppAsyncThunk('auth/login', async (authInfo: User) => {
  const logInResult = await fetchLogIn(authInfo);
  if (logInResult == 200) {
    //fullfiled
    return true;
  } else {
    //rejected
    // Promise.reject();
    return false;
  }
});

export const signin = createAppAsyncThunk('auth/signin', async (authInfo: User) => {
  const logInResult = await fetchSignIn(authInfo);
  if (logInResult == 200) {
    //fullfiled
    return true;
  } else {
    //rejected
    return false;
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

export const check = createAppAsyncThunk('auth/check', async () => {
  const res = await fetchСheckAuth();
  // if (res !== 200) throw new Error();
  // return true;

  // return new Promise(() => {
  //   throw new Error();
  // })

  await fetchСheckAuth().then((status) => {
    if (status == 200) {
      //fullfiled
      return true;
    } else {
      //rejected
      throw new Error();
    }
  });
});

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  // isAuth: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          // state.isAuth = action.payload;
          state.authErrorMessage = null;
        } else {
          state.status = 'rejected';
          // state.isAuth = false;
          state.authErrorMessage = 'Неверный логин или пароль';
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        // state.isAuth = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signin.fulfilled, (state) => {
        state.status = 'succeeded';
        // state.isAuth = true;
        state.authErrorMessage = 'Ошибка регистрации';
      })
      .addCase(signin.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(check.fulfilled, (state) => {
        state.status = 'succeeded';
        // state.isAuth = true;
        state.authErrorMessage = null;
      })
      .addCase(check.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(check.rejected, (state) => {
        state.status = 'rejected';
        // state.isAuth = false;
        state.authErrorMessage = 'Время токена истекло, пройдите авторизацию';
      });
  },
});

export default authSlice.reducer;

export const { changeStatus } = authSlice.actions;
// export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getAuthErrorMessage = (state: RootState) => state.auth.authErrorMessage;
export const getAuthSatus = (state: RootState) => state.auth.status;
// export const selectCurrentUsername = (state: RootState) => state.auth.isAuth
