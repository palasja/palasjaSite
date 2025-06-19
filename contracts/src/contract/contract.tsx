import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppSelector } from '../app/hooks';
import { getChosenOrganization } from '../features/orgs/orgsSlice';

const Contract = () => {
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

export default Contract;
