import { useEffect, useState } from 'react';
import { fetchActInfo } from '../../helpers/api';
import { ActInfo, Personal } from '../../helpers/contractTypes';
import {
  getShortName,
  getServicesCostWithNDS,
  MONTH_R,
  getServicesCostWithNDS_47,
} from '../../helpers/helper';
import { FIRST_NAME, LAST_NAME, MIDDLE_NAME, NDS, SHORT_NAME } from '../../helpers/constants';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';
import { useParams } from 'react-router';
import style from './act.module.css';
const REPRESENTOR_POSITION = 'бухгалтер';
const currencyOption: ConvertOptions = {
  currency: {
    currencyNameCases: ['белорусский рубль', 'белорусских рубля', 'белорусских рублей'], // [1 рубль, 2-4 рубля, 5-9 рублей]
    fractionalPartNameCases: ['копейка', 'копейки', 'копеек'],
    currencyNounGender: {
      integer: 0, // 0 => Мужской род ('один', 'два'...)
      fractionalPart: 1, // 1 => Женский род ('одна', 'две'...)
    },
    fractionalPartMinLength: 2,
  },
};

const ActPMS = () => {
  const { orgId } = useParams();
  const { month } = useParams();
  const [info, setInfo] = useState<ActInfo>();
  const [head, setHead] = useState<Personal>();
  const [itog, setItog] = useState<number>(0);
  useEffect(() => {
    const getPersonals = () => {
      if (orgId !== undefined && month !== undefined) {
        fetchActInfo(orgId, month).then((info) => {
          setInfo(info);
          setHead(info?.persons.find((p) => p.isHead) as Personal);
          setItog(getServicesCostWithNDS_47(info?.services));
        });
      }
    };
    getPersonals();
  }, []);
  const representor = info?.persons.find((p) =>
    new RegExp(REPRESENTOR_POSITION).test(p.positionName)
  );
  const economist = info?.persons.find(
    (p) => !new RegExp(REPRESENTOR_POSITION).test(p.positionName) && !p.isHead
  );
  return (
    <>
      {info?.contract === null ? (
        <>
          <h1>No contract</h1>
        </>
      ) : (
        <>
          <div className={style.page}>
            <div className={style.head}>
              <p>А К Т</p>
              <p>приемки выполненных работ по</p>
              <p>гражданско-правовому договору</p>
            </div>
            <div className={style.datePlace}>
              <p>
                от {new Date(info?.contract.signDate as unknown as string).getDate()}{' '}
                {MONTH_R[Number(month) - 1]}{' '}
                {new Date(info?.contract.signDate as unknown as string).getFullYear()} года
              </p>
              <p>г. Наровля</p>
            </div>
            <div className={style.main}>
              <p className={style.mainInfo}>
                Мы, стороны по договору от{' '}
                {new Date(info?.contract.signDate as unknown as string).toLocaleDateString('ru-RU')}{' '}
                года № {info?.contract.number}, Коммунальное мелиоративное унитарное предприятие
                «Наровлянское ПМС», именуемое в дальнейшем «Заказчик», в лице директора{' '}
                {head?.firstNameR} {head?.middleNameR} {head?.lastNameR}, действующего на основании
                Устава, с одной стороны и гражданин Якубенко Иван Александрович, паспорт НВ 2955507,
                выданный 20.06.2016 г. Наровлянским РОВД, проживающий по адресу: Гомельская область,
                г. Наровля, ул. Мелиоративная, 43/1, именуемый в дальнейшем «Исполнитель», составили
                настоящий акт о том, что в соответствии с договором № {info?.contract.number} от{' '}
                {new Date(info?.contract.signDate as unknown as string).toLocaleDateString('ru-RU')}{' '}
                года Исполнителем выполнены следующие работы (оказаны услуги):
              </p>
              <p>- {info?.services.map((s) => s.name).join(', ')}.</p>
              <p>
                Работы принял представитель Заказчика – {representor?.firstName}{' '}
                {representor?.middleName} {representor?.lastName}, {representor?.positionName}.
              </p>
              <p>
                Работы по договору выполнены на сумму {itog.toFixed(2)} (
                {convertNumberToWordsRu(itog, currencyOption)}).{' '}
              </p>
              <p>В момент приемки работ Заказчиком претензий к качеству работ не имеет.</p>
            </div>
            <div className={style.sidesInfo}>
              <div>
                <p>ЗАКАЗЧИК:</p>
                <p>Государственное предприятие «Наровлянское ПМС»</p>
                <p>247802, Гомельская область,</p>
                <p>г. Наровля, ул. Спивака, 1 Б</p>
                <p>р/с BY97AKBB30120332510123300000</p>
                <p>BIC AKBBBY21317 </p>
                <p>г. Минск, проспект Дзержинского, 18</p>
                <p>УНП 400517900 ОКПО 290364733</p>
                <p className={style.sidesInfo_sign}>Директор ___________ И.А.Ковальчук </p>
                <p>м.п.</p>
              </div>
              <div>
                <p>ИСПОЛНИТЕЛЬ:</p>
                <p>Якубенко Иван Александрович</p>
                <p>Дата рождения 08.06.1991 г.</p>
                <p>Паспорт НВ 2955507 выдан 20.06.2016 г.</p>
                <p>Наровлянским РОВД </p>
                <p>Адрес: Гомельская обл., г. Наровля, ул. Мелиоративная, 43/1</p>
                <p>Страховой номер 3080691Н001РВ9</p>
                <p>Идентификационный № 3080691Н001РВ9</p>
                <p className={style.sidesInfo_sign}>Гражданин_____________ И.А. Якубенко </p>
              </div>
            </div>
            <div className={style.signs}>
              <div>
                <p className={style.position}>Представитель Заказчика</p>
                <p>________________ {getShortName(representor)}</p>
                <p className={style.sign}>(подпись)</p>
              </div>
              <div>
                <p className={style.position}>{economist?.positionName}</p>
                <p>________________ {getShortName(economist)}</p>
                <p className={style.sign}>(подпись)</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ActPMS;
