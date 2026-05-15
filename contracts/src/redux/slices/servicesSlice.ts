import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface ServicesState {
  choosenMonth: string;
  choosenYear: string;
  isWithoutOrg: boolean;
  fullDesc: string;
}

const initialState: ServicesState = {
  choosenMonth: new Date().getMonth().toString(),
  choosenYear: new Date().getFullYear().toString(),
  isWithoutOrg: false,
  fullDesc: ''
};

const servicesSlicer = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    chooseMonth(state, action) {
      state.choosenMonth = action.payload;
    },
    chooseYear(state, action) {
      state.choosenYear = action.payload;
    },
    isWithoutOrg(state, action: PayloadAction<boolean>) {
      state.isWithoutOrg = action.payload;
    },
    fullDesc(state, action: PayloadAction<string>) {
      state.fullDesc = action.payload;
    },
  },
});

export const { chooseMonth, chooseYear, isWithoutOrg, fullDesc} = servicesSlicer.actions;
export default servicesSlicer.reducer;
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth;
export const getChoosenYear = (state: RootState) => state.services.choosenYear;
export const getIsWithoutOrg = (state: RootState) => state.services.isWithoutOrg;
export const getFullDesc = (state: RootState) => state.services.fullDesc;
