import { useState } from 'react';
import './App.css';
import Contracts from './contracts';
import Personals from './personal';
import Services from './services';
import Organization from './organization';
import { Link } from 'react-router';

function App() {
  const [orgId, setOrgId] = useState<string>();

  // useEffect(() => {
  //     const getContracts = () => {
  //       fetchContracts(org.id).then((contracts) => setConstracts(contracts));
  //     };
  //     getContracts();
  // }, [org] );
  return (
    <>
    {orgId == undefined ? '' : <Contracts orgId={orgId} />}
      <Link to="/act/1/4">ACT 1/4</Link>
      <Organization setOrgId={(id) => setOrgId(id)} />
      {orgId == undefined ? '' : <Contracts orgId={orgId} />}
      {orgId == undefined ? '' : <Personals orgId={orgId} />}
      {orgId == undefined ? '' : <Services orgId={orgId} />}
      {/* {orgId == undefined ? '' : <Act orgId={orgId} month={4} />} */}
    </>
  );
}

export default App;
