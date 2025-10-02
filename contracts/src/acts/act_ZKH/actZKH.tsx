import { getShortName, getServicesCostWithNDS, MONTH_R } from '../../helpers/helper';
import {
  COUNT_FOR_ONE_PAGE,
  FIRST_NAME,
  LAST_NAME,
  MIDDLE_NAME,
  NDS,
  SHORT_NAME,
} from '../../helpers/constants';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';
import style from './act.module.css';
import { useAppSelector } from '../../redux/hooks';
import { getChoosenMonth } from '../../redux/slices/servicesSlice';

import { Contract, Personal, Service } from '../../helpers/contractTypes';
import PageWrapper from '../pageWrapper';

type ServiceForTableType = Pick<Service, 'name' | 'cost' | 'count'>;
type ActZKHProps = {
  contract: Contract;
  personal: Personal[];
  services: Service[];
  signDate: Date;
};
type ActZKHHeadProps = {
  head?: Personal;
  sign?: Personal;
  signDate: Date;
};
type ActZKFooterProps = {
  contract: Contract | null;
  sign?: Personal;
};
type ActZKTableProps = {
  groupedServices: ServiceForTableType[];
  itog?: number;
  choosenMonth?: string;
};
const groupServiseByCostAndName = (services: Service[]): ServiceForTableType[] => {
  const grouped = Object.groupBy(services, (s) => s.name + s.cost);
  const groupedArray = Object.values(grouped).map((arr) => {
    if (arr?.length === 1) {
      return arr[0];
    } else {
      let c = 0;
      arr?.forEach((a) => (c += a.count));
      const itog = arr![0];
      return { name: itog.name, cost: itog.cost, count: c };
    }
  });
  const sortedByNameArray = groupedArray.sort((a, b) => {
    const nameA = a.name.toUpperCase().trim();
    const nameB = b.name.toUpperCase().trim();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedByNameArray;
};

const ActZKHHead = ({ head, sign, signDate }: ActZKHHeadProps) => {
  return (
    <>
      <div className={style.headSign}>
        <p>УТВЕРЖДАЮ:</p>
        <p>
          <span className={style.variable}>{head?.positionName}</span>
        </p>
        <p>
          _______________<span className={style.variable}>{getShortName(head)}</span>
        </p>
        <p>«___»___________2025</p>
      </div>
      <div className={style.act}>
        <p>АКТ</p>
        <p>ПРИЕМКИ ВЫПОЛНЕННЫХ РАБОТ</p>
      </div>

      <div className={style.underAct}>
        <p>г. Наровля</p>
        <p className={style.variable}>
          « {signDate.getDate()} » {MONTH_R[signDate.getMonth()]} {signDate.getFullYear()}
        </p>
      </div>

      <div className={style.indent}>
        <p>
          Мы, нижеподписавшиеся:{' '}
          <span className={style.variable}>{`${LAST_NAME} ${FIRST_NAME} ${MIDDLE_NAME}`}</span>, с
          одной стороны и{' '}
          <span
            className={style.variable}
          >{`${sign?.lastName} ${sign?.firstName} ${sign?.middleName}`}</span>
          , с другой стороны, составили настоящий акт в том, что первый выполнил работы в
          расчетно-справочном центре:
        </p>
      </div>
    </>
  );
};
const ActZKHFooter = ({ sign, contract }: ActZKFooterProps) => {
  return (
    <>
      <div>
        <p className={style.indent}>
          Акт составлен на предмет оплаты за выполненный объем работы, согласно заключенного
          договора подряда № <span className={style.variable}>{contract?.number}</span> от{' '}
          <span className={style.variable}>
            {contract && new Date(contract.signDate).toLocaleDateString('ru-RU')}
          </span>
        </p>
      </div>
      <div className={style.sign}>
        <p>
          Работу принял __________________{' '}
          <span className={style.variable}>{getShortName(sign)}</span>
        </p>
        <p>
          Работу сдал __________________ <span className={style.variable}>{SHORT_NAME}</span>
        </p>
      </div>
    </>
  );
};
const ActZKHTable = ({ groupedServices, itog, choosenMonth }: ActZKTableProps) => {
  return (
    <>
      <table className={style.actTtable}>
        <thead>
          <tr>
            <th>Услуга</th>
            <th>Количество</th>
            <th>Стоимость</th>
            <th>Сумма с НДС</th>
          </tr>
        </thead>
        {itog && (
          <tfoot>
            <tr>
              <td colSpan={3}>Итог</td>
              <td className={style.tableNumber}>{itog}</td>
            </tr>
          </tfoot>
        )}

        <tbody>
          {groupedServices.map((s, i) => {
            return (
              <tr key={i}>
                <td>{s.name}</td>
                <td className={style.tableNumber}>{s.count}</td>
                <td className={style.tableNumber}>{s.cost}</td>
                <td className={style.tableNumber}>
                  {(s.count * s.cost * 100 + s.count * s.cost * (NDS / 100) * 100) / 100}
                </td>
                {/* <td>{Math.round(((s.count * s.cost) + (s.count * s.cost * (NDS/100))*100))/100}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {itog && (
        <div>
          <p className={style.lower}>
            (<span className={style.variable}>{convertNumberToWordsRu(itog)}</span>)
          </p>
          <p>
            в полном объеме с{' '}
            <span className={style.variable}>
              {new Date(2025, Number(choosenMonth)).toLocaleDateString('ru-RU')}
            </span>{' '}
            по{' '}
            <span className={style.variable}>
              {new Date(2025, Number(choosenMonth) + 1, 0).toLocaleDateString('ru-RU')}
            </span>{' '}
            согласно заключенного договора подряда.
          </p>
        </div>
      )}
    </>
  );
};
const ActZKH = ({ contract, personal, services, signDate }: ActZKHProps) => {
  const choosenMonth = useAppSelector(getChoosenMonth);
  const head = personal[0];
  const sign = personal[1];
  const itog = getServicesCostWithNDS(services);
  const groupedServices = groupServiseByCostAndName(services);

  const COUNT_SERVICES_ON_BREAK_PAGE = 22;
  const pageCount = Math.ceil(groupedServices.length / COUNT_FOR_ONE_PAGE);
  return (
    <>
      {pageCount === 1 ? (
        <PageWrapper>
          <ActZKHHead head={head} sign={sign} signDate={signDate} />
          <ActZKHTable groupedServices={groupedServices} itog={itog} choosenMonth={choosenMonth} />
          <ActZKHFooter contract={contract} sign={sign} />
        </PageWrapper>
      ) : (
        <>
          <PageWrapper>
            <ActZKHHead head={head} sign={sign} signDate={signDate} />
            <ActZKHTable groupedServices={groupedServices.slice(0, COUNT_SERVICES_ON_BREAK_PAGE)} />
          </PageWrapper>
          <PageWrapper>
            <ActZKHTable
              groupedServices={groupedServices.slice(COUNT_SERVICES_ON_BREAK_PAGE)}
              itog={itog}
              choosenMonth={choosenMonth}
            />
            <ActZKHFooter contract={contract} sign={sign} />
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default ActZKH;
