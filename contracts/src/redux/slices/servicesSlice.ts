import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ServiceCostChange } from '../../helpers/contractTypes';
import { Service } from '../../helpers/contractTypes'; 
interface ServicesState {
  choosenMonth: string;
  choosenYear: string;
  chosenService: number;
  serviceCostChange: ServiceCostChange[];
}

const initialState: ServicesState = {
  choosenMonth: new Date().getMonth().toString(),
  choosenYear: new Date().getFullYear().toString(),
  chosenService: 0,
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
    serviceCosChange(state, action: PayloadAction<ServiceCostChange[]>) {
      state.serviceCostChange = action.payload;
    },
    chooseServiceId(state, action: PayloadAction<number>) {
      state.chosenService = action.payload;
    },
  },
});

export const { chooseMonth, chooseYear, serviceCosChange, chooseServiceId } =
  servicesSlicer.actions;
export default servicesSlicer.reducer;
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth;
export const getChoosenYear = (state: RootState) => state.services.choosenYear;
export const getServiceCostChange = (state: RootState) => state.services.serviceCostChange;
export const getChoosenServiceId = (state: RootState) => state.services.chosenService;
