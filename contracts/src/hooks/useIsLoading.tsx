import { useMemo } from 'react';
import { FetchStatus } from '../helpers/contractTypes';
import { useAppSelector } from '../redux/hooks';
import { getAuthSatus } from '../redux/slices/authSlice';
import { getContractSatus } from '../redux/slices/contractSlice';
import { getOrganisationSatus } from '../redux/slices/orgsSlice';
import { getPersonalSatus } from '../redux/slices/personalsSlice';
import { getServicesSatus } from '../redux/slices/servicesSlice';

const useIsLoading = () => {
  const stateOrg = useAppSelector(getOrganisationSatus);
  const statePersonal = useAppSelector(getPersonalSatus);
  const stateContract = useAppSelector(getContractSatus);
  const stateServices = useAppSelector(getServicesSatus);
  const stateAuth = useAppSelector(getAuthSatus);
  const pending: FetchStatus = 'pending';
  const visibleTodos = useMemo(
    () =>
      stateOrg === pending ||
      statePersonal === pending ||
      stateContract === pending ||
      stateServices === pending ||
      stateAuth === pending,
    [stateOrg, statePersonal, stateContract, stateServices, stateAuth]
  );
  console.log(
    `${stateOrg} === 'pending' || ${statePersonal} === 'pending' || ${stateContract} === 'pending' || ${stateServices} === 'pending' || ${stateAuth} === 'pending'`
  );
  return visibleTodos;
};

export default useIsLoading;
