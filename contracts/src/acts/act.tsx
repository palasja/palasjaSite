import { useEffect, useState } from 'react';
import {
  fetchActInfo,
  fetchAllOrganizations,
  fetchContractsByOrgIdMonth,
  fetchPersonalsByOrgId,
  fetchServicesByOrgIdMonth,
} from '../helpers/api';
import {
  ActInfo,
  Contract,
  Personal,
  Service,
  Organization as Org,
} from '../helpers/contractTypes';
import {
  getServicesCost,
  getServicesCostWithNDS,
  getServicesCostWithNDS_47,
  MONTH_R,
} from '../helpers/helper';
import style from './act.module.css';
import ActZKH from './act_ZKH';
import ActPMS from './act_PMS';
import { Link } from 'react-router';
import { NDS_VICHET, PENSIA, NDS } from '../helpers/constants';
import services from '../services';

const Act = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [orgId, setOrgId] = useState('');
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [contract, setContract] = useState<Contract>({} as Contract);
  const [personals, setPersonals] = useState<Personal[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    const getOrganization = () => {
      fetchAllOrganizations().then((orgs) => {
        if (typeof orgs !== 'string') {
          setOrganizations(orgs as Org[]);
          setOrgId(orgs[0].id);
        }
      });
    };
    getOrganization();
  }, []);
  useEffect(() => {
    const getInfo = () => {
      fetchPersonalsByOrgId(orgId).then((persons) => setPersonals(persons));
      fetchContractsByOrgIdMonth(orgId, month).then((con) => setContract(con));
      fetchServicesByOrgIdMonth(orgId, month).then((s) => setServices(s));
    };
    if (organizations.length !== 0) getInfo();
  }, [orgId]);

  useEffect(() => {
    const getInfo = () => {
      fetchContractsByOrgIdMonth(orgId, month).then((con) => setContract(con));
      fetchServicesByOrgIdMonth(orgId, month).then((s) => setServices(s));
    };
    if (organizations.length !== 0) getInfo();
  }, [month]);

  const handlerActMonth = (month: number): void => setMonth(month);
  const handlerOrganization = (id: string): void => setOrgId(id);
  return (
    <>
      <div className={style.noprint}>
        <h1>{organizations?.find((o) => o.id === orgId)?.name}</h1>
        <select onChange={(e) => handlerActMonth(Number(e.target.value))} defaultValue={month}>
          {MONTH_R.map((e, i) => {
            return (
              <option value={i} key={i}>
                {e}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handlerOrganization(e.target.value)}>
          {organizations.map((org) => {
            return (
              <option value={org.id} key={org.id}>
                {org.name}
              </option>
            );
          })}
        </select>
      </div>

      {organizations?.find((o) => o.id === orgId)?.name === 'ЖКХ' ? (
        <>
          <article  className={style.noprint}>
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
            <ActZKH contract={contract} services={services} personals={personals} month={month} />
          </div>
        </>
      ) : (
        <>
          <article>
            <p>Заработано = {getServicesCost(services)}</p>
            <p>Стоимость с НДС = {getServicesCostWithNDS(services)}</p>
            <p>
              К получению после вычета НДС
              {getServicesCostWithNDS(services) - getServicesCostWithNDS(services) * (NDS / 100)}
            </p>
          </article>
          <div className={style.page}>
            <ActPMS contract={contract} services={services} personals={personals} month={month} />
          </div>
        </>
      )}
    </>
  );
};

export default Act;
