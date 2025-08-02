import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chooseOrg, getChosenOrganization, getOrganisationSatus } from '../redux/slices/orgsSlice';
import style from './app.module.css';
import { getIsWithoutOrg, getServicesSatus, isWithoutOrg } from '../redux/slices/servicesSlice';
import { getContractSatus } from '../redux/slices/contractSlice';
import { getPersonalSatus } from '../redux/slices/personalsSlice';
import useIsLoading from '../hooks/useIsLoading';

const App = () => {
  const dispatch = useAppDispatch();
  const orgId = useAppSelector(getChosenOrganization)?.id;
  const isNoOrg = useAppSelector(getIsWithoutOrg);
  const noOrgHandler = () => {
    dispatch(isWithoutOrg(true));
    dispatch(chooseOrg(null));
  };

  return (
    <>
      <button onClick={() => noOrgHandler()} data-testid="withoutOrg">
        Услуги без организации
      </button>
      <button onClick={() => dispatch(isWithoutOrg(false))} data-testid="includeOrg">
        Oрганизации
      </button>
      {isNoOrg ? (
        <>
          <Services />
        </>
      ) : (
        <>
          <Organization />
          {orgId == undefined ? (
            <h2>Выберите организацию</h2>
          ) : (
            <>
              <Contracts />
              <Personals />
              <Services />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
