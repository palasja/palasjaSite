import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface ServerErrorState {
  isServerError: boolean;
}
const initialState: ServerErrorState = {
  isServerError: false,
};

const serverErrorStateSlice = createSlice({
  name: 'ServerError',
  initialState,
  reducers: {
    changeIsServerError(state, action: PayloadAction<boolean>) {
      state.isServerError = action.payload;
    },
  },
});

export default serverErrorStateSlice.reducer;

export const {  changeIsServerError } =
  serverErrorStateSlice.actions;
export const getIsServerError = (state: RootState) => state.serverError.isServerError;
