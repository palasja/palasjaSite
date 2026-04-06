import { Outlet, useParams } from "react-router";
import Contracts from '../contracts';
import Personals from '../personal';
import Services from '../services';
import Organization from '../organization';
import { Organization as OrgType } from '../helpers/contractTypes';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  getChosenInfo,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import style from './app.module.css';
import Act from '../acts/act';
import { useEffect } from "react";
import { useGetOrganizationQuery } from "../redux/slices/organizationRTKSlice";

const App = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const info = useAppSelector(getChosenInfo);
  const dispatch = useAppDispatch();
  const { data: organizations = [], isLoading, isSuccess } = useGetOrganizationQuery();
  let {orgID} = useParams();
  useEffect(() => {
    if(orgID !== undefined && isSuccess) {
      let org = organizations.find(o => o.id === parseInt(orgID)) as OrgType ;
      dispatch(chooseOrg(org));
    }
  },[organizations, choosenOrg, isSuccess])

  const appContent = (
    <>
      <Organization />
      <>
        {choosenOrg == undefined ? (
          <h2>Выберите организацию</h2>
        ) : (
          <>
            <Outlet/>
            {/* {info == 'service' && <Services />}
            {info == 'contract' && <Contracts />}
            {info == 'personal' && <Personals />}
            {info == 'act' && <Act />} */}
          </>
        )}
      </>
    </>
  );

  return appContent;
};

export default App;
