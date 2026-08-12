import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ServiceCostChange } from '../../helpers/contractTypes';

interface ServicesState {
  choosenMonth: string;
  choosenYear: string;
  fullDesc: string;
  serviceCostChange: ServiceCostChange[];
}

const initialState: ServicesState = {
  choosenMonth: new Date().getMonth().toString(),
  choosenYear: new Date().getFullYear().toString(),
  fullDesc: '',
  serviceCostChange: [],
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
    fullDesc(state, action: PayloadAction<string>) {
      state.fullDesc = action.payload;
    },
    serviceCosChange(state, action: PayloadAction<ServiceCostChange[]>) {
      state.serviceCostChange = action.payload;
    },
  },
});

export const { chooseMonth, chooseYear, fullDesc, serviceCosChange } =
  servicesSlicer.actions;
export default servicesSlicer.reducer;
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth;
export const getChoosenYear = (state: RootState) => state.services.choosenYear;
export const getFullDesc = (state: RootState) => state.services.fullDesc;
export const getServiceCostChange = (state: RootState) => state.services.serviceCostChange;
