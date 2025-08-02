import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus, Service } from '../../helpers/contractTypes';
import { createAppAsyncThunk } from '../../redux/withTypes';
import {
  fetchServicesByOrgIdMonth as fetchServices,
  removeService,
  updateService,
  addService,
} from '../../helpers/api';
import { RootState } from '../../redux/store';

interface ServicesState {
  services: Service[];
  choosenMonth: string;
  isWithoutOrg: boolean;
  changingService: Service | null;
  status: FetchStatus;
}

export const fetchServicesByOrgIdMonth = createAppAsyncThunk(
  'service/fetchServices',
  async ({ orgId, month }: { orgId: number | null; month: string }) => {
    const response = await fetchServices(orgId, month);
    return response;
  }
);

export const createService = createAppAsyncThunk('service/addService', async (service: Service) => {
  const response = await addService(service);
  return response;
});

export const delService = createAppAsyncThunk(
  'service/removeService',
  async (serviceId: number): Promise<number> => {
    const response = await removeService(serviceId);
    if (!response) throw new Error();
    return serviceId;
  }
);

export const editService = createAppAsyncThunk(
  'service/updateService',
  async (service: Service): Promise<Service> => {
    const response = await updateService(service);
    if (!response) throw new Error();
    return service;
  }
);

const initialState: ServicesState = {
  services: [],
  choosenMonth: new Date().getMonth().toString(),
  isWithoutOrg: false,
  changingService: null,
  status: 'idle',
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
    changingService(state, action: PayloadAction<Service>) {
      state.changingService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesByOrgIdMonth.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchServicesByOrgIdMonth.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createService.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(delService.fulfilled, (state, action) => {
        state.services = state.services.filter((p) => p.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(delService.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editService.fulfilled, (state, action) => {
        const editedService = action.payload;
        const service = state.services.find((p) => p.id == editedService.id);
        if (service) {
          (service.name = editedService.name),
            (service.cost = editedService.cost),
            (service.count = editedService.count),
            (service.date = editedService.date),
            (service.place = editedService.place),
            (service.user = editedService.user);
        }
        state.status = 'succeeded';
      })
      .addCase(editService.pending, (state) => {
        state.status = 'pending';
      });
  },
});

export const { chooseMonth, changingService, isWithoutOrg } = servicesSlicer.actions;
export default servicesSlicer.reducer;

export const getServices = (state: RootState) => state.services.services;
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth;
export const getIsWithoutOrg = (state: RootState) => state.services.isWithoutOrg;
export const getChangingService = (state: RootState) => state.services.changingService;
export const getServicesSatus = (state: RootState) => state.auth.status;
