import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { Link } from 'react-router';

const Contract = () => {
  const [orgId, setOrgId] = useState<string>();
  
  return (
    <>
      <Organization setOrgId={(id) => setOrgId(id)} />
      {orgId == undefined ? (
        <></>
      ) : (
        <>
          <Link to={`/act/${orgId}/5`}>ACT 1/4</Link>

          <Contracts orgId={orgId} />
          <Personals orgId={orgId} />
          <Services orgId={orgId} />
        </>
      )}
    </>
  );
}

export default Contract;
