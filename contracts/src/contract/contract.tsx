import { useState } from 'react';
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { useAppSelector } from '../app/hooks';
import { getChosenOrganization } from '../features/orgs/orgsSlice';

const Contract = () => {
  const orgId = useAppSelector(getChosenOrganization)?.id;
  return (
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
  );
};

export default Contract;
