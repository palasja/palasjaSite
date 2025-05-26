import { useEffect, useState } from 'react';
import { fetchActInfo } from '../helpers/api';
import { ActInfo, Personal } from '../helpers/contractTypes';
import { getShortName } from '../helpers/helper';
import { FIRST_NAME, LAST_NAME, MIDDLE_NAME, NDS, SHORT_NAME } from '../helpers/constants';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';
import { useParams } from 'react-router';
import style from './act.module.css';

const Act = () => {
  const { orgId } = useParams();
  const { month } = useParams();
  const [info, setInfo] = useState<ActInfo>();
  const [head, setHead] = useState<Personal>();
  const [sign, setSign] = useState<Personal>();
  const [itog, setItog] = useState<number>(0);
  useEffect(() => {
    const getPersonals = () => {
      if (orgId !== undefined && month !== undefined) {
        fetchActInfo(orgId, month).then((info) => {
          setInfo(info);
          setHead(info?.persons.find((p) => p.headPosition !== null) as Personal);
          setSign(info?.persons.find((p) => p.signPosition !== null) as Personal);
          let itogSumm = 0;
          info?.services.forEach((s) => (itogSumm += s.count * s.cost));
          setItog((itogSumm * 100 + itogSumm * (NDS / 100) * 100) / 100);
        });
      }
    };
    getPersonals();
  }, []);

  return (
    <>
      {info?.contract === null || head === undefined || sign === undefined ? (
        <></>
      ) : (
        <>
          <div className={style.print}>
            <div>
              <p>УТВЕРЖДАЮ:</p>
              <p>{head?.headPosition}</p>
              <p>_______________{getShortName(head)}</p>
              <p>«__»___________2025</p>
            </div>

            <p>АКТ</p>
            <p>ПРИЕМКИ ВЫПОЛНЕННЫХ РАБОТ</p>

            <div>
              <p>г. Наровля</p>
              <p>«__»___________2025</p>
            </div>

            <div>
              <p>
                Мы, нижеподписавшиеся: {`${LAST_NAME} ${FIRST_NAME} ${MIDDLE_NAME}`}, с одной
                стороны и {`${sign?.lastName} ${sign?.firstName} ${sign?.middleName}`}, с другой
                стороны, составили настоящий акт в том, что первый выполнил работы в расчетно-
                справочном центре:
              </p>
            </div>
            <table>
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
                  <td>{itog}</td>
                </tr>
              </tfoot>
              <tbody>
                {info?.services.map((s, i) => {
                  return (
                    <tr key={i}>
                      <td>{s.name}</td>
                      <td>{s.count}</td>
                      <td>{s.cost}</td>
                      <td>
                        {(s.count * s.cost * 100 + s.count * s.cost * (NDS / 100) * 100) / 100}
                      </td>
                      {/* <td>{Math.round(((s.count * s.cost) + (s.count * s.cost * (NDS/100))*100))/100}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p>({convertNumberToWordsRu(itog)})</p>
            <p>
              в полном объеме с {new Date(2025, Number(month)).toLocaleDateString('ru-RU')} по{' '}
              {new Date(2025, Number(month) + 1, 0).toLocaleDateString('ru-RU')} согласно
              заключенного договора подряда.
            </p>
            <p>
              Акт составлен на предмет оплаты за выполненный объем работы, согласно заключенного
              договора подряда № {info?.contract.number} от {info?.contract.signDate.toString()}
            </p>

            <p>Работу принял __________________ {getShortName(sign)}</p>
            <p>Работу сдал __________________ {SHORT_NAME}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Act;
