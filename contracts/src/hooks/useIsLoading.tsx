import { useAppSelector } from '../redux/hooks';
import { isContractLoading } from '../redux/slices/contractSlice';
import { isOrgLoading } from '../redux/slices/orgsSlice';
import { isPersonalLoading } from '../redux/slices/personalsSlice';
import { isServicesLoading } from '../redux/slices/servicesSlice';

const useIsLoading = () => {
  return useAppSelector(isOrgLoading || isContractLoading || isPersonalLoading || isServicesLoading);
};

export default useIsLoading;
