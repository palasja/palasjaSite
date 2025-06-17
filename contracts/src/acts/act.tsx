import { useEffect } from 'react';
import {
  getIdNum,
  getServicesCost,
  getServicesCostWithNDS,
  getServicesCostWithNDS_47,
  MONTH_R,
  NotNullubleValue,
} from '../helpers/helper';
import style from './act.module.css';
import ActZKH from './act_ZKH';
import ActPMS from './act_PMS';
import { NDS_VICHET, PENSIA, NDS } from '../helpers/constants';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { chooseMonth, getServices, getChoosenMonth, fetchServicesByOrgIdMonth } from '../features/services/servicesSlice';
import { chooseOrg, fetchOrgs, getAllOrganisation, getChosenOrganization } from '../features/orgs/orgsSlice';
import { fetchPersonalsByOrgId } from '../features/personals/personalsSlice';
import { fetchContractsByOrgIMonth } from '../features/contracts/contractSlice';

const Act = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const organizations = useAppSelector(getAllOrganisation);
  const services = useAppSelector(getServices);
  useEffect(() => {
    if(organizations.length == 0) dispatch(fetchOrgs());
  }, []);
  useEffect(() => {
    if(choosenOrg){
      let orgId = choosenOrg?.id;

      dispatch(fetchServicesByOrgIdMonth({orgId: orgId, month: choosenMonth}));
      dispatch(fetchPersonalsByOrgId(orgId));
      dispatch(fetchContractsByOrgIMonth({orgId: orgId, month: choosenMonth}));
    }

  }, [choosenOrg]);

  useEffect(() => {
     if(choosenOrg){
       const orgId = choosenOrg?.id;
       dispatch(fetchServicesByOrgIdMonth({orgId: orgId, month: choosenMonth}));
       dispatch(fetchContractsByOrgIMonth({orgId: orgId, month: choosenMonth}));

     }
  }, [choosenMonth]);

  const handlerChooseMonth = (month: string) => dispatch(chooseMonth(month));
  const handlerChooseOrganization = (id: string) =>{
    const idNum = getIdNum(id); 
    const organization = NotNullubleValue(organizations.find(o => o.id === idNum));
     dispatch(chooseOrg(organization))
  };

  return (
    <>
      <div className='noprint'>
        <h1>{choosenOrg?.name}</h1>
        <select onChange={(e) => handlerChooseMonth(e.target.value)} defaultValue={choosenMonth}>
          {MONTH_R.map((e, i) => {
            return (
              <option value={i} key={i}>
                {e}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handlerChooseOrganization(e.target.value)}>
          {organizations.map((org) => {
            return (
              <option value={org.id} key={org.id}>
                {org.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* {contract === null ? (
        <h2>Нет договора за {MONTH_R[Number.parseInt(choosenMonth)]} месяц</h2>
      ) : ( */}
        <>
          {choosenOrg?.name === 'ЖКХ' ? (
            <>
              <article className='noprint'>
                <p>Заработано = {getServicesCost(services)}</p>
                <p>Стоимость с НДС = {getServicesCostWithNDS(services)}</p>
                <p>
                  К получению после вычета НДС
                  {getServicesCostWithNDS(services) -
                    getServicesCostWithNDS(services) * (NDS / 100)}
                </p>
              </article>
              <div className={style.page}>
                <ActZKH />
              </div>
            </>
          ) : (
            <>

            <article  className='noprint'>
                <p>Заработано = {getServicesCost(services)}</p>
                <p>Стоимость с НДС = {getServicesCostWithNDS_47(services)}</p>
                <p>
                  К получению после вычета НДС ={' '}
                  {getServicesCostWithNDS_47(services) -
                    getServicesCost(services) *
                      ((getServicesCostWithNDS_47(services) < NDS_VICHET ? PENSIA : NDS) / 100)}
                </p>
              </article>
              <div className={style.page}>
                <ActPMS />
              </div>
            </>
          )}
        </>
      {/* )} */}
    </>
  );
};

export default Act;
