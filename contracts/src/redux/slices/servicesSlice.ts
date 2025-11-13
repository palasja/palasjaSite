import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../helpers/contractTypes';

import { RootState } from '../../redux/store';

interface ServicesState {
  choosenMonth: string;
  isWithoutOrg: boolean;
}

const initialState: ServicesState = {
  choosenMonth: new Date().getMonth().toString(),
  isWithoutOrg: false,
};

const servicesSlicer = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    chooseMonth(state, action) {
      state.choosenMonth = action.payload;
    },
    isWithoutOrg(state, action: PayloadAction<boolean>) {
      state.isWithoutOrg = action.payload;
    },
  },
});

export const { chooseMonth, isWithoutOrg } = servicesSlicer.actions;
export default servicesSlicer.reducer;
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth;
export const getIsWithoutOrg = (state: RootState) => state.services.isWithoutOrg;
