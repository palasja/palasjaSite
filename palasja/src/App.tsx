import { useState } from 'react'
import './App.css'
import Contracts from './contracts';
import Personals from './personal';
import Services from './services';
import Organization from './organization';



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
      <Organization setOrgId={(id) => setOrgId(id)}/>
      {
        orgId == undefined ? '' : <Contracts orgId={orgId}/>
      }
      {
        orgId == undefined  ? '' : <Personals orgId={orgId}/>
      }
      {
        orgId == undefined  ? '' : <Services orgId={orgId}/>
      }
    </>
  )
}

export default App
