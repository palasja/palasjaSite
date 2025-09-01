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
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseMonth,
  getChoosenMonth,
} from '../redux/slices/servicesSlice';
import {
  chooseOrg,
  getChosenOrganization,
  getOrganisationError,
  getOrganisationSatus,
} from '../redux/slices/orgsSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { useLazyGetContractsByOrgIdMonthQuery } from '../redux/slices/contractRTKSlice';
import { Contract } from '../helpers/contractTypes';
import { useLazyGetPersonalsByOrgIdQuery } from '../redux/slices/personalRTKSlice';
import { useLazyGetServicesByOrgIdMonthQuery } from '../redux/slices/servicesRTKSlice';

const Act = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const { data: organizations = [] } = useGetOrganizationQuery();
  const [loadContract, { data: choosenContract }] = useLazyGetContractsByOrgIdMonthQuery();
  const [loadPersonal, { data: personal }] = useLazyGetPersonalsByOrgIdQuery();
  const [loadServices, { data: services }] = useLazyGetServicesByOrgIdMonthQuery();
  const handlerChooseMonth = (month: string) => {
    dispatch(chooseMonth(month));
    if (choosenOrg) {
      const orgId = choosenOrg?.id;
      dispatch(chooseMonth(month));
      loadServices({ orgId: orgId, month: month });
      loadContract({ orgId: orgId, month: month });
    }
  };
  const handlerChooseOrganization = (id: string) => {
    if (id !== undefined) {
      const idNum = getIdNum(id);
      const organization = NotNullubleValue(organizations.find((o) => o.id === idNum));
      dispatch(chooseOrg(organization));
      loadServices({ orgId: idNum, month: choosenMonth });
      loadPersonal(idNum);
      loadContract({ orgId: organization.id, month: choosenMonth });
    }
  };

  return (
    <>
      <div className="noprint">
        <h1>{choosenOrg?.name}</h1>
        <select
          onChange={(e) => handlerChooseMonth(e.target.value)}
          defaultValue={choosenMonth}
          data-testid="monthSelect"
        >
          {MONTH_R.map((e, i) => {
            return (
              <option value={i} key={i}>
                {e}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => handlerChooseOrganization(e.target.value)}
          defaultValue={choosenOrg?.id}
          data-testid="orgSelect"
        >
          <option key={-1}>-</option>
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
        {choosenOrg?.name === 'ЖКХ' && services !== undefined ? (
          <>
            <article className="noprint">
              <p>Заработано = {getServicesCost(services)}</p>
              <p>Стоимость с НДС = {getServicesCostWithNDS(services)}</p>
              <p>
                К получению после вычета НДС
                {getServicesCostWithNDS(services) - getServicesCostWithNDS(services) * (NDS / 100)}
              </p>
            </article>
            {choosenContract && personal && (
              <ActZKH contract={choosenContract} personal={personal} services={services} />
            )}
          </>
        ) : (
          services && (
            <>
              <article className="noprint">
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
                {choosenContract && personal && (
                  <ActPMS contract={choosenContract} personal={personal} services={services} />
                )}
              </div>
            </>
          )
        )}
      </>
      {/* )} */}
    </>
  );
};

export default Act;
