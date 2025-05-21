import { useState } from 'react';
import './App.css';
import Contracts from './contracts';
import Personals from './personal';
import Services from './services';
import Organization from './organization';
import { Link } from 'react-router';

function App() {
  const [orgId, setOrgId] = useState<string>();
  
  return (
    <>
      <Organization setOrgId={(id) => setOrgId(id)} />
      {orgId == undefined ? (
        <></>
      ) : (
        <>
          <Link to={`/act/${orgId}/4`}>ACT 1/4</Link>

          <Contracts orgId={orgId} />
          <Personals orgId={orgId} />
          <Services orgId={orgId} />
        </>
      )}
    </>
  );
}

export default App;
