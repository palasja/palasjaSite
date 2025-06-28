import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import style from './app.module.css';

const App = () => {
  const orgId = useAppSelector(getChosenOrganization)?.id;
  const [isWithoutOrg, setIsWithoutOrg] = useState(false);
  return (
    <>
      <button onClick={() => setIsWithoutOrg(true)} data-testid="withoutOrg">
        Услуги без организации
      </button>
      <button onClick={() => setIsWithoutOrg(false)} data-testid="includeOrg">
        Oрганизации
      </button>
      {isWithoutOrg ? (
        <>
          <Services isWithoutOrg={true} />
        </>
      ) : (
        <>
          <Organization />
          {orgId == undefined ? (
            <h2>Выберите организацию{orgId}</h2>
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
