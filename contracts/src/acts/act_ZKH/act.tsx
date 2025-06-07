import { useEffect, useState } from 'react';
import { fetchActInfo } from '../../helpers/api';
import { ActInfo, Contract, Personal, Service } from '../../helpers/contractTypes';
import { getShortName, getServicesCostWithNDS } from '../../helpers/helper';
import { FIRST_NAME, LAST_NAME, MIDDLE_NAME, NDS, SHORT_NAME } from '../../helpers/constants';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';
import { useParams } from 'react-router';
import style from './act.module.css';

type ActTypeProps = {
  contract: Contract;
  services: Service[];
  personals: Personal[];
  month: number;
};
const ActZKH = ({ contract, services, personals, month }: ActTypeProps) => {
  const head = personals.find((p) => p.isHead);
  const sign = personals.find((p) => !p.isHead);
  const itog = getServicesCostWithNDS(services);
  // const { orgId } = useParams();
  // const { month } = useParams();
  // const [info, setInfo] = useState<ActInfo>();
  // const [head, setHead] = useState<Personal>();
  // const [sign, setSign] = useState<Personal>();
  // const [itog, setItog] = useState<number>(0);
  // useEffect(() => {
  //   const getPersonals = () => {
  //     if (orgId !== undefined && month !== undefined) {
  //       fetchActInfo(orgId, month).then((info) => {
  //         setInfo(info);
  //         setHead(info?.persons.find((p) => p.isHead) as Personal);
  //         setSign(info?.persons.find((p) => !p.isHead) as Personal);
  //         setItog(getServicesCostWithNDS(info?.services));
  //       });
  //     }
  //   };
  //   getPersonals();
  // }, []);

  return (
    <>
      <div className={style.print}>
        <div className={style.headSign}>
          <p>УТВЕРЖДАЮ:</p>
          <p><span className={style.variable}>{head?.positionName}</span></p>
          <p>_______________<span className={style.variable}>{getShortName(head)}</span></p>
          <p>«___»___________2025</p>
        </div>
        <div className={style.act}>
          <p>АКТ</p>
          <p>ПРИЕМКИ ВЫПОЛНЕННЫХ РАБОТ</p>
        </div>

        <div className={style.underAct}>
          <p>г. Наровля</p>
          <p>«___»___________2025</p>
        </div>

        <div className={style.indent}>
          <p>
            Мы, нижеподписавшиеся: <span className={style.variable}>{`${LAST_NAME} ${FIRST_NAME} ${MIDDLE_NAME}`}</span>, с одной стороны и{' '}
            <span className={style.variable}>{`${sign?.lastName} ${sign?.firstName} ${sign?.middleName}`}</span>, с другой стороны,
            составили настоящий акт в том, что первый выполнил работы в расчетно-справочном центре:
          </p>
        </div>
        <table className={style.actTtable}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Количество</th>
              <th>Стоимость</th>
              <th>Сумма с НДС</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={3}>Итог</td>
              <td className={style.tableNumber}>{itog}</td>
            </tr>
          </tfoot>
          <tbody>
            {services.map((s, i) => {
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

        <div>
          <p className={style.lower}>(<span className={style.variable}>{convertNumberToWordsRu(itog)}</span>)</p>
          <p>
            в полном объеме с <span className={style.variable}>{new Date(2025, month).toLocaleDateString('ru-RU')}</span> по{' '}
            <span className={style.variable}>{new Date(2025, Number(month), 0).toLocaleDateString('ru-RU')}</span> согласно заключенного
            договора подряда.
          </p>
          <p className={style.indent}>
            Акт составлен на предмет оплаты за выполненный объем работы, согласно заключенного
            договора подряда № <span className={style.variable}>{contract.number}</span> от{' '}
            <span className={style.variable}>{new Date(contract.signDate).toLocaleDateString('ru-RU')}</span>
          </p>
        </div>

        <div className={style.sign}>
          <p>Работу принял __________________ <span className={style.variable}>{getShortName(sign)}</span></p>
          <p>Работу сдал __________________ <span className={style.variable}>{SHORT_NAME}</span></p>
        </div>
      </div>
    </>
  );
};

export default ActZKH;
