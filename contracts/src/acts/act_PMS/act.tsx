import { Contract, Personal, Service } from '../../helpers/contractTypes';
import {
  getShortName,
  MONTH_R,
  currencyOption,
  getServicesCostWithNDS_47,
} from '../../helpers/helper';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru';
import style from './act.module.css';
const REPRESENTOR_POSITION = 'бухгалтер';
type ActTypeProps = {
  contract: Contract;
  services: Service[];
  personals: Personal[];
  month: number;
};
const ActPMS = ({ contract, services, personals, month }: ActTypeProps) => {
  const head = personals.find((p) => p.isHead);
  const itog = getServicesCostWithNDS_47(services);

  const representor = personals.find((p) => new RegExp(REPRESENTOR_POSITION).test(p.positionName));
  const economist = personals.find(
    (p) => !new RegExp(REPRESENTOR_POSITION).test(p.positionName) && !p.isHead
  );
  return (
    <>
      {contract === null ? (
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
                от <span className={style.variable}>{new Date(contract.signDate).getDate()} {MONTH_R[month]} {new Date(contract.signDate).getFullYear()}</span> года
              </p>
              <p>г. Наровля</p>
            </div>
            <div className={style.main}>
              <p className={style.mainInfo}>
                Мы, стороны по договору от <span className={style.variable}>{new Date(contract.signDate).toLocaleDateString('ru-RU')}</span>{' '}
                года № <span className={style.variable}>{contract.number}</span>, Коммунальное мелиоративное унитарное предприятие
                «Наровлянское ПМС», именуемое в дальнейшем «Заказчик», в лице директора{' '}
                <span className={style.variable}>{head?.lastNameR} {head?.firstNameR} {head?.middleNameR} </span>, действующего на основании
                Устава, с одной стороны и гражданин Якубенко Иван Александрович, паспорт НВ 2955507,
                выданный 20.06.2016 г. Наровлянским РОВД, проживающий по адресу: Гомельская область,
                г. Наровля, ул. Мелиоративная, 43/1, именуемый в дальнейшем «Исполнитель», составили
                настоящий акт о том, что в соответствии с договором № <span className={style.variable}>{contract.number}</span> от{' '}
                <span className={style.variable}>{new Date(contract.signDate).toLocaleDateString('ru-RU')}</span> года
                Исполнителем выполнены следующие работы (оказаны услуги):
              </p>
              <p>- <span className={style.variable}>{services.map((s) => s.name).join(', ')}</span>.</p>
              <p>
                Работы принял представитель Заказчика – <span className={style.variable}>{representor?.firstName}</span>{' '}
                <span className={style.variable}>{representor?.middleName} {representor?.lastName}, {representor?.positionName}</span>.
              </p>
              <p>
                Работы по договору выполнены на сумму <span className={style.variable}>{itog.toFixed(2)}</span> (
                <span className={style.variable}>{convertNumberToWordsRu(itog, currencyOption)}</span>).{' '}
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
                <p className={style.sidesInfo_sign}>Директор ___________ <span className={style.variable}>{getShortName(head)}</span></p>
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
                <p>________________ <span className={style.variable}>{getShortName(representor)}</span></p>
                <p className={style.sign}>(подпись)</p>
              </div>
              <div>
                <p className={style.position}>{economist?.positionName}</p>
                <p>________________ <span className={style.variable}>{getShortName(economist)}</span></p>
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
