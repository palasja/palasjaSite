import { createSlice } from "@reduxjs/toolkit";
import { Service } from "../../helpers/contractTypes";
import { createAppAsyncThunk } from "../../app/withTypes";
import { fetchServicesByOrgIdMonth as fetchServices, removeService, updateService, addService} from "../../helpers/api";
import { RootState } from "../../app/store";

interface ServicesState {
  services: Service[],
  choosenMonth: string
}

export const fetchServicesByOrgIdMonth = createAppAsyncThunk('service/fetchServices', async ({orgId, month}: {orgId: string, month: string}) => {
  const response = await fetchServices(orgId, month);
  return response;
})

export const createService = createAppAsyncThunk('service/addService', async (service: Service) => {
  const response = await addService(service);
  return response;
})

export const delService = createAppAsyncThunk('service/removeService', async (serviceId: string): Promise<string> => {
  const response = await removeService(serviceId);
  if (!response) throw new Error();
  return serviceId;
})

export const editService = createAppAsyncThunk('service/updateService', async (service: Service): Promise<Service> => {
  const response = await updateService(service);
  if (!response) throw new Error();
  return service;
})

const initialState: ServicesState = {
  services: [],
  choosenMonth: new Date().getMonth().toString()
};

const servicesSlicer = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    chooseMonth (state, action){
      state.choosenMonth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServicesByOrgIdMonth.fulfilled, (state, action) => {
      state.services = action.payload
    })
    .addCase(createService.fulfilled, (state, action) => {
      state.services.push(action.payload);
    })
    .addCase(delService.fulfilled, (state, action) => {
       state.services = state.services.filter(p => p.id !== action.payload )
    })
    .addCase(editService.fulfilled, (state, action) => {
        const editedService = action.payload;
        const service = state.services.find(p => p.id == editedService.id)
        if (service) {
          service.name = editedService.name,
          service.cost = editedService.cost,
          service.count = editedService.count,
          service.date = editedService.date,
          service.place = editedService.place,
          service.user = editedService.user
        }
    })
  }
});

export const { chooseMonth } = servicesSlicer.actions
export default servicesSlicer.reducer

export const getServices = (state: RootState) => state.services.services
export const getChoosenMonth = (state: RootState) => state.services.choosenMonth
