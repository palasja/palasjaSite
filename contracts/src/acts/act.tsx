import { ChangeEvent, useEffect, useState } from 'react';
import {
  circleCost,
  getIdNum,
  getServicesCost,
  getServicesCostWithNDS,
  getServicesCostWithNDS_47,
  getShortName,
  MONTH_R,
} from '../helpers/helper';
import style from './act.module.css';
import ActZKH from './act_ZKH';
import ActPMS from './act_PMS';
import { NDS_VICHET, PENSIA, NDS } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chooseMonth, getChoosenMonth, getChoosenYear } from '../redux/slices/servicesSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { useLazyGetContractsByOrgIdMonthYearQuery } from '../redux/slices/contractRTKSlice';
import { useLazyGetPersonalsByOrgIdQuery } from '../redux/slices/personalRTKSlice';
import { useLazyGetServicesByOrgIdMonthYearQuery } from '../redux/slices/servicesRTKSlice';
import { Personal, Service } from '../helpers/contractTypes';
import Loading from '../components/loading';
import SelectMonthYear from '../components/selectMonthYear';

type AtcType = 'jkh' | 'pms' | null;
const actNameType: { [key: string]: AtcType } = {
  ЖКХ: 'jkh',
  ПМС: 'pms',
};
const Act = () => {
  const [actType, setActType] = useState<AtcType>(null);
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenYear = useAppSelector(getChoosenYear);
  // const { data: organizations = [], isFetching: oLoading } = useGetOrganizationQuery();
  const [loadContract, { data: choosenContract, isFetching: cLoading }] =
    useLazyGetContractsByOrgIdMonthYearQuery();
  const [loadPersonal, { data: personal, isFetching: pLoading }] =
    useLazyGetPersonalsByOrgIdQuery();
  const [loadServices, { data: services, isFetching: sLoading }] =
    useLazyGetServicesByOrgIdMonthYearQuery();
  const [personalByOrder, setPersonalByOrder] = useState<Personal[]>([]);
  const HEAD_ORG_NUM_IN_ARR = 0;
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (choosenOrg) {
      const orgId = choosenOrg?.id;
      console.log(choosenOrg?.id);
      loadServices({
        orgId: choosenOrg?.id,
        month: choosenMonth,
        year: choosenYear,
        isPaid: isPaid,
      });
      loadPersonal(orgId);
      loadContract({ orgId: orgId, month: choosenMonth, year: choosenYear });
    }
  }, [choosenMonth, choosenOrg, choosenYear, isPaid]);

  const handlerPaidService = (paid: boolean) => {
    setIsPaid(paid);
  };

  const getDateString = (date: number | string) => new Date(date);
  const [signDate, useSignDate] = useState(
    getDateString(new Date().setDate(new Date().getDate() + 1))
  );
  const [startDate, useStartDate] = useState(
    new Date(new Date().getFullYear(), Number(choosenMonth))
  );
  const [endDate, useEndDate] = useState(
    new Date(new Date().getFullYear(), Number(choosenMonth) + 1, 0)
  );
  const changeSignDateHandler = (date: string) => {
    const newDate = getDateString(date);
    useSignDate(newDate);
  };
  const changeStartDateHandler = (date: string) => {
    const newDate = getDateString(date);
    useStartDate(newDate);
  };
  const changeEndDateHandler = (date: string) => {
    const newDate = getDateString(date);
    useEndDate(newDate);
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

  const PersonOptions = () => {
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

  const SignerSelect = ({ count }: { count: number }) => {
    return (
      <div>
        <div className={style.signField}>
          <label htmlFor="firstSignPerson">Руководитель</label>
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              chosePersonHandler(HEAD_ORG_NUM_IN_ARR, e.target.value)
            }
            defaultValue={personalByOrder[0] !== undefined ? personalByOrder[0].id : ''}
            data-testid="headOrg"
            name="headOrg"
          >
            <PersonOptions />
          </select>
        </div>
        {[...new Array(count)].map((e, i) => {
          return (
            <div key={i} className={style.signField}>
              <label htmlFor={`sign${i + 1}`}>Подпись {i + 1}</label>
              <select
                onChange={(e) => chosePersonHandler(i + 1, e.target.value)}
                defaultValue={personalByOrder[i + 1] !== undefined ? personalByOrder[i + 1].id : ''}
                data-testid={`sign${i + 1}`}
              >
                <PersonOptions />
              </select>
            </div>
          );
        })}
      </div>
    );
  };
  const PMSCostInfo = ({ services }: { services: Service[] }) => {
    return (
      <article className={style.costInfo}>
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
    );
  };
  const JKHCostInfo = ({ services }: { services: Service[] }) => {
    return (
      <article className={style.costInfo}>
        <p>Заработано = {getServicesCost(services)}</p>
        <p>Стоимость с НДС = {getServicesCostWithNDS(services)}</p>
        <p>
          К получению после вычета НДС
          {circleCost(
            getServicesCostWithNDS(services) - getServicesCostWithNDS(services) * (NDS / 100)
          )}
        </p>
      </article>
    );
  };
  type ZKHInfoType = { services: Service[] };
  const ZKHInfo = ({ services }: ZKHInfoType) => {
    return (
      <>
        <section className={`noprint ${style.infoContainer}`}>
          <div>
            <div className={style.dataSign}>
              <label htmlFor="signDate">Дата подписания (Первый рабочий день нового месяца)</label>
              <input
                type="date"
                name="signDate"
                value={signDate.toLocaleString('sv-SE').slice(0, 10)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeSignDateHandler(e.target.value);
                }}
              />
            </div>
            <div className={style.dataSign}>
              <label htmlFor="startDate">Дата начала</label>
              <input
                type="date"
                name="startDate"
                value={startDate.toLocaleString('sv-SE').slice(0, 10)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeStartDateHandler(e.target.value);
                }}
              />
            </div>
            <div className={style.dataSign}>
              <label htmlFor="endDate">Дата окончания</label>
              <input
                type="date"
                name="endDate"
                value={endDate.toLocaleString('sv-SE').slice(0, 10)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeEndDateHandler(e.target.value);
                }}
              />
            </div>
            <SignerSelect count={1} />
          </div>
          <JKHCostInfo services={services} />
        </section>

        {choosenContract ? (
          <>
            <ActZKH
              contract={choosenContract}
              personal={personalByOrder}
              services={services}
              signDate={signDate}
              startDate={startDate}
              endDate={endDate}
            />
          </>
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
        <section className={`noprint ${style.infoContainer}`}>
          <SignerSelect count={2} />
          <PMSCostInfo services={services} />
        </section>

        <div className={style.page}>
          {choosenContract && (
            <ActPMS contract={choosenContract} personal={personalByOrder} services={services} />
          )}
        </div>
      </>
    );
  };

  return cLoading || pLoading || sLoading ? (
    <Loading />
  ) : (
    <>
      <div className="noprint">
        <h1>{choosenOrg?.name}</h1>
        <div className={style.actType}>
          <SelectMonthYear />
          <select
            onChange={(e) =>
              setActType(e.target.id === undefined ? null : actNameType[e.target.value])
            }
            data-testid="orgSelect"
          >
            <option key={-1}>-</option>
            <option id={'jkh'}>ЖКХ</option>
            <option id={'pms'}>ПМС</option>
          </select>
          <div>
            <label htmlFor="paid"> Оплачено</label>
            <input
              type="checkbox"
              name="paid"
              checked={isPaid}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handlerPaidService(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <>
        {actType == 'jkh' && services !== undefined && personal !== undefined && (
          <ZKHInfo services={services} />
        )}
        {actType == 'pms' && services && personal && <PMSInfo services={services} />}
      </>
    </>
  );
};

export default Act;
