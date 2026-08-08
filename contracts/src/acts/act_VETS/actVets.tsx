import { useState } from 'react';
import { LAST_NAME, FIRST_NAME, MIDDLE_NAME, SHORT_NAME, NDS, COUNT_FOR_ONE_PAGE } from '../../helpers/constants';
import { Contract, Personal, Service, ServiceForTableType } from '../../helpers/contractTypes';
import { getServicesCostWithNDS, getShortName, groupServiseByCostAndName, MONTH_R } from '../../helpers/helper';
import { useAppSelector } from '../../redux/hooks';
import { getChoosenMonth } from '../../redux/slices/servicesSlice';
import PageWrapper from '../pageWrapper';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';

import style from './actVets.module.css';
type ActVetsProps = {
  contract: Contract;
  personal: Personal[];
  services: Service[];
  signDate: Date;
};
type ActVetsHeadProps = {
  head?: Personal;
  contract: Contract;
  signDate: Date;
};

type ActVetsTableProps = {
  groupedServices: ServiceForTableType[];
  itog?: number;
};
type ActVetsFooterProps = {
  sign?: Personal;
};
const ActVetsHead = ({ head, contract, signDate }: ActVetsHeadProps) => {
  return (
    <>
      <div className={style.headSign}>
        <div className={style.act}>
          <p>АКТ</p>
          <p>ПРИЕМКИ ВЫПОЛНЕННЫХ РАБОТ (оказанных услуг)</p>
          <p>к договору подряда № {contract.number} от {contract.signDate.toString()} г.</p>
        </div>

        <div className={style.underAct}>
          <p>г. Наровля</p>
          <p className={style.variable}>
            « {signDate.getDate()} » {MONTH_R[signDate.getMonth()]} {signDate.getFullYear()}
          </p>
        </div>

        <div>
          <div >
            <div className={style.contractUserContainer}>
              <div>Подрядчик:</div>
              <div>Гражданин Якубенко И.А., паспорт серии НВ №3992294,
                выдан 15.04.2026, Наровлянским РОВД, л.н.3080691H001РВ9
                Республика Беларусь, проживающий по адресу: г.Наровля,
                УЛ.Мелиоративная д,43 кв. 1, телефон +375 29 8337619.
              </div>
            </div>
            <div className={style.contractUserContainer}>
              <div>Заказчик:</div>
              <div>Учреждение «Наровлянская районная ветеринарная станция»
                Юр.адр: 247801 Гомельская область, г.Наровля, ул.Гастелло, д.12
                УНП 400056029
              </div>
            </div>
          </div>
          <p className={style.contractText}>
            Настоящий акт составлен, с одной стороны, гражданин <span className={style.variable}>{`${LAST_NAME} ${FIRST_NAME} ${MIDDLE_NAME}`}</span>,
            по адресу: г.Наровля, ул.Мелиоративная д, 43 кв. 1,
            именуемый в дальнейшем Подрядчик, и с другой стороны учреждение «Наровлянская районная ветеринарная станция»
            в лице <span className={style.variable}>{`${head?.lastname} ${head?.firstname} ${head?.middlename}`}</span>, действующего на основании Устава, именуемое в дальнейшем Заказчик,
            в том, что Подрядчик выполнил следующие работы (услуги) в полном объеме, согласно заключенному договору:
          </p>
        </div>
      </div>
    </>
  );
};

const ActVetsTable = ({
  groupedServices,
  itog,
}: ActVetsTableProps) => {
  return (
    <>
      <table className={style.actTtable}>
        <thead>
          <tr>
            <th>Наименование работы (услуги)</th>
            <th>Ед.изм.</th>
            <th>Кол-во</th>
            <th>Цена, руб.коп.</th>
            <th>Стои-мость,
              руб. коп.
            </th>
            <th>Став
              ка НДС, %
            </th>
            <th>Сумма с НДС</th>
          </tr>
        </thead>

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
                <td>{s.count}</td>
                <td>{s.count}</td>
                <td>{s.count}</td>
                {/* <td>{Math.round(((s.count * s.cost) + (s.count * s.cost * (NDS/100))*100))/100}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {itog && (
        <div className={style.itog}>
          <p>Итого: {itog} ({convertNumberToWordsRu(itog)})</p>
        </div>
      )}
    </>
  );
};

const ActVetsFooter = ({ sign}: ActVetsFooterProps) => {
  return (
    <>
      <div className={style.signContainer}>
        <div className={style.sign}>
          <p>Подрядчик</p>
          <p>
            Гражданин
          </p>
          <p>
            __________________ <span className={style.variable}>{SHORT_NAME}</span>
          </p>
        </div>
        <div className={style.sign}>
          <p>Заказчик</p>
          <p>
            Начальник-главный ветврач
          </p>
          <p>
            __________________ <span className={style.variable}>{getShortName(sign)}</span>
          </p>
        </div>
      </div>
    </>
  );
};
const ActVets = ({ contract, services, signDate, personal }: ActVetsProps) => {
  const head = personal[0];
  const itog = getServicesCostWithNDS(services);
  const groupedServices = groupServiseByCostAndName(services);
  const [breackPage, setBreakPage] = useState(22);
  // const COUNT_SERVICES_ON_BREAK_PAGE = 22;
  // const pageCount = Math.ceil(groupedServices.length / COUNT_FOR_ONE_PAGE);
  return (
    <>
      <input
        type="number"
        value={breackPage}
        onChange={(e) => setBreakPage(parseInt(e.target.value, 10))}
        className="noprint"
      ></input>
      {<PageWrapper>
        <ActVetsHead head={head} contract={contract} signDate={signDate} />
        <ActVetsTable
          groupedServices={groupedServices}
          itog={itog}
        />
        <ActVetsFooter sign={head} />
      </PageWrapper>
      }
    </>
  );
};

export default ActVets 