import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';

const Contract = () => {
  const [orgId, setOrgId] = useState<string>();

  return (
    <>
      <Organization setOrgId={(id) => setOrgId(id)} />
      {orgId == undefined ? (
        <></>
      ) : (
        <>
          <Contracts orgId={orgId} />
          <Personals orgId={orgId} />
          <Services orgId={orgId} />
        </>
      )}
    </>
  );
};

export default Contract;
