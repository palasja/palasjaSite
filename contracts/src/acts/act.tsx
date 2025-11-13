import { ChangeEvent, useEffect, useState } from 'react';
import {
  circleCost,
  getIdNum,
  getServicesCost,
  getServicesCostWithNDS,
  getServicesCostWithNDS_47,
  getShortName,
  MONTH_R,
  NotNullubleValue,
} from '../helpers/helper';
import style from './act.module.css';
import ActZKH from './act_ZKH';
import ActPMS from './act_PMS';
import { NDS_VICHET, PENSIA, NDS } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chooseMonth, getChoosenMonth } from '../redux/slices/servicesSlice';
import { chooseOrg, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { useLazyGetContractsByOrgIdMonthQuery } from '../redux/slices/contractRTKSlice';
import { useLazyGetPersonalsByOrgIdQuery } from '../redux/slices/personalRTKSlice';
import { useLazyGetServicesByOrgIdMonthQuery } from '../redux/slices/servicesRTKSlice';
import { Personal, Service } from '../helpers/contractTypes';
import Loading from '../components/loading';

const Act = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const { data: organizations = [], isFetching: oLoading } = useGetOrganizationQuery();
  const [loadContract, { data: choosenContract, isFetching: cLoading }] =
    useLazyGetContractsByOrgIdMonthQuery();
  const [loadPersonal, { data: personal, isFetching: pLoading }] =
    useLazyGetPersonalsByOrgIdQuery();
  const [loadServices, { data: services, isFetching: sLoading }] =
    useLazyGetServicesByOrgIdMonthQuery();
  const [personalByOrder, setPersonalByOrder] = useState<Personal[]>([]);
  const HEAD_ORG_NUM_IN_ARR = 0;
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (choosenOrg) {
      const orgId = choosenOrg?.id;
      loadServices({ orgId: choosenOrg?.id, month: choosenMonth, isPaid: isPaid });
      loadPersonal(orgId);
      loadContract({ orgId: orgId, month: choosenMonth });
    }
  }, [choosenMonth, choosenOrg, isPaid]);

  const handlerChooseMonth = (month: string) => {
    dispatch(chooseMonth(month));
  };
  const handlerPaidService = (paid: boolean) => {
    setIsPaid(paid);
  };
  const handlerChooseOrganization = (id: string) => {
    const organization = NotNullubleValue(organizations.find((o) => o.id === parseInt(id, 10)));
    setPersonalByOrder([]);
    dispatch(chooseOrg(organization));
  };

  const getDateString = (date: number | string) => new Date(date);
  const [signDate, useSignDate] = useState(
    getDateString(new Date().setDate(new Date().getDate() + 1))
  );

  const changeDateHandler = (date: string) => {
    const newDate = getDateString(date);
    useSignDate(newDate);
  };

  const findPerson = (id: string) => {
    const idNum = parseInt(id, 10);
    return personal?.find((p) => p.id == idNum) as Personal;
  };

  const chosePersonHandler = (num: number, id: string) => {
    const idNum = parseInt(id, 10);
    personal?.find((p) => p.id == idNum) as Personal;
    const person = findPerson(id);
    const a = [...personalByOrder.slice(0, num), person, ...personalByOrder.slice(num + 1)];
    setPersonalByOrder(a);
  };

  const getpersonOptions = () => {
    return (
      <>
        <option key={-1}>-</option>
        {personal &&
          personal.map((p, i) => {
            return (
              <option value={p.id} key={i}>
                {getShortName(p)}: {p.positionName}
              </option>
            );
          })}
      </>
    );
  };

  const signerSelect = (count: number) => {
    return (
      <div>
        <br />
        <label htmlFor="firstSignPerson">Руководитель</label>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            chosePersonHandler(HEAD_ORG_NUM_IN_ARR, e.target.value)
          }
          defaultValue={personalByOrder[0] !== undefined ? personalByOrder[0].id : ''}
          data-testid="headOrg"
          name="headOrg"
        >
          {getpersonOptions()}
        </select>
        <br />
        {[...new Array(count)].map((e, i) => {
          return (
            <div key={i}>
              <label htmlFor={`sign${i + 1}`}>Подпись {i + 1}</label>
              <select
                onChange={(e) => chosePersonHandler(i + 1, e.target.value)}
                defaultValue={personalByOrder[i + 1] !== undefined ? personalByOrder[i + 1].id : ''}
                data-testid={`sign${i + 1}`}
              >
                {getpersonOptions()}
              </select>
            </div>
          );
        })}
      </div>
    );
  };
  type ZKHInfoType = { services: Service[] };
  const ZKHInfo = ({ services }: ZKHInfoType) => {
    return (
      <>
        <section className="noprint">
          <article>
            <p>Заработано = {getServicesCost(services)}</p>
            <p>Стоимость с НДС = {getServicesCostWithNDS(services)}</p>
            <p>
              К получению после вычета НДС
              {circleCost(
                getServicesCostWithNDS(services) - getServicesCostWithNDS(services) * (NDS / 100)
              )}
            </p>
          </article>
          <label htmlFor="signDate">Дата подписания (Первый рабочий день нового месяца)</label>
          <input
            type="date"
            name="signDate"
            value={signDate.toLocaleString('sv-SE').slice(0, 10)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              changeDateHandler(e.target.value);
            }}
          />
          {signerSelect(1)}
        </section>

        {choosenContract ? (
          <ActZKH
            contract={choosenContract}
            personal={personalByOrder}
            services={services}
            signDate={signDate}
          />
        ) : (
          <h3>Нет договора на {MONTH_R[parseInt(choosenMonth)]}</h3>
        )}
      </>
    );
  };

  type PMSInfoType = { services: Service[] };
  const PMSInfo = ({ services }: PMSInfoType) => {
    return (
      <>
        <section className="noprint">
          {signerSelect(2)}

          <article>
            <p>Заработано = {getServicesCost(services)}</p>
            <p>Стоимость с НДС = {getServicesCostWithNDS_47(services)}</p>
            <p>
              К получению после вычета НДС ={' '}
              {circleCost(
                getServicesCostWithNDS_47(services) -
                  getServicesCost(services) *
                    ((getServicesCostWithNDS_47(services) < NDS_VICHET ? PENSIA : NDS) / 100)
              )}
            </p>
          </article>
        </section>

        <div className={style.page}>
          {choosenContract && (
            <ActPMS contract={choosenContract} personal={personalByOrder} services={services} />
          )}
        </div>
      </>
    );
  };

  return oLoading || cLoading || pLoading || sLoading ? (
    <Loading />
  ) : (
    <>
      <div className="noprint">
        <h1>{choosenOrg?.name}</h1>
        {isPaid && (
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
        )}
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
        <label htmlFor="paid" className="noprint">
          Оплаченые
        </label>
        <input
          type="checkbox"
          name="paid"
          checked={isPaid}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handlerPaidService(e.target.checked)}
        />
      </div>
      <>
        {choosenOrg?.name === 'ЖКХ' && services !== undefined && personal !== undefined ? (
          <ZKHInfo services={services} />
        ) : (
          services && personal && <PMSInfo services={services} />
        )}
      </>
    </>
  );
};

export default Act;
