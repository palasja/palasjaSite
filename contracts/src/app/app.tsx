import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  getChosenInfo,
  getChosenOrganization,
  getOrganisationSatus,
} from '../redux/slices/orgsSlice';
import style from './app.module.css';
import { getIsWithoutOrg, isWithoutOrg } from '../redux/slices/servicesSlice';
import Act from '../acts/act';

const App = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const info = useAppSelector(getChosenInfo);

  const appContent = (
    <>
      <Organization />
      <>
        {choosenOrg == undefined ? (
          <h2>Выберите организацию</h2>
        ) : (
          <>
            {info == 'service' && <Services />}
            {info == 'contract' && <Contracts />}
            {info == 'personal' && <Personals />}
            {info == 'act' && <Act />}
          </>
        )}
      </>
    </>
  );

  return appContent;
};

export default App;
