import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import style from './app.module.css'
const App = () => {
  const orgId = useAppSelector(getChosenOrganization)?.id;
  const [isWithoutOrg, setIsWithoutOrg] = useState(false);
  return (
    <>
      <p onClick={() => setIsWithoutOrg(true)}>Услуги без организации</p>
      <p onClick={() => setIsWithoutOrg(false)}>Oрганизации</p>
      {isWithoutOrg ?
      <>
      <Services isWithoutOrg={true}/>
      </>
      :
      <>
        <Organization />
        {orgId == undefined ? (
          <></>
        ) : (
          <>
            <Contracts />
            <Personals />
            <Services />
          </>
        )}      
      </>
    }
      

    </>
  );
};

export default App;
