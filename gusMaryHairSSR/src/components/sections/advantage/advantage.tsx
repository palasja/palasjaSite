import { AdvatageItemProps } from '../../../helpers/types';
import style from './advantage.module.css';

export const advantages: AdvatageItemProps[] = [
  {
    title: {
      __html: `Качественная <br class="responsiveNewLineMobile" /><br class="responsiveNewLineTablet" /> и быстрая работа`,
    },
    text: {
      __html: `Я использую только проверенные и <br class="responsiveNewLineMobile" /> безопасные средства, тщательно отбираю материалы, которые использую в своей <br class="responsiveNewLineMobile" /> работе`,
    },
  },
  {
    title: 'Опытный мастер',
    text: { __html: `Более 10 лет в бьюти-сфере делаю  клиентов счастливее` },
  },
  {
    title: 'Скидки',
    text: {
      __html: `Карта лояльности постоянного клиента: скидка <br class='responsiveNewLineMonitor' /> на каждую третью процедуру. Первое посещение <br class='responsiveNewLineMonitor' /> с 10% скидкой. Каждому именнику - подарок`,
    },
  },
];

const AdvatageItem = ({ title, text }: AdvatageItemProps) => {
  return (
    <article className={style.advantageItem}>
      <h4
        dangerouslySetInnerHTML={typeof title != 'string' ? title : undefined}
        className={style.advantageItemName}
      >
        {typeof title == 'string' ? title : undefined}
      </h4>
      <p dangerouslySetInnerHTML={text} className={style.advantageItemcText}></p>
    </article>
  );
};

const Advantage = () => {
  return (
    <section id="advantage" className={style.advantage}>
      <div className={style.imageContainer}>
        <img src="/images/maria_certificates.png" alt="Мария с сертификатами" loading="lazy"></img>
      </div>
      <div className={style.advantageDescription}>
        <h2 className={style.title}>Преимущества</h2>
        <div className={style.advantages}>
          {advantages.map((a, i) => (
            <AdvatageItem key={i} title={a.title} text={a.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
