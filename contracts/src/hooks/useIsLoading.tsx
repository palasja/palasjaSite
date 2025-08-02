import { useAppSelector } from "../redux/hooks";
import { getAuthSatus } from "../redux/slices/authSlice";
import { getContractSatus } from "../redux/slices/contractSlice";
import { getOrganisationSatus } from "../redux/slices/orgsSlice";
import { getPersonalSatus } from "../redux/slices/personalsSlice";
import { getServicesSatus } from "../redux/slices/servicesSlice";

const useIsLoading = () => {
    const stateOrg = useAppSelector(getOrganisationSatus);
    const statePersonal = useAppSelector(getPersonalSatus);
    const stateContract = useAppSelector(getContractSatus);
    const stateServices = useAppSelector(getServicesSatus);
    const stateAuth = useAppSelector(getAuthSatus);
    return stateOrg === 'pending' || statePersonal === 'pending' || stateContract === 'pending' || stateServices === 'pending' || stateAuth === 'pending';
}

export default useIsLoading;