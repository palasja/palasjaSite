import { PHONE_NUMBER } from '../../../helpers/constants';
import style from './maria.module.css';

const Maria = () => {
  return (
    <section id="maria" className={style.maria}>
      <div className={style.content}>
        <p className={style.master}>
          Мастер <br className="responsiveNewLineMobile" />
          <br className="responsiveNewLineTablet" />
          по реконструкции <br className="responsiveNewLineMobile" />
          <br className="responsiveNewLineTablet" />
          волос
        </p>
        <h1 className={style.name}>
          <span className={style.firstName}>
            Maria
            <br />
          </span>
          Gusak
        </h1>
        <a href={`tel:${PHONE_NUMBER}`} className={style.appoint}>
          <div className={style.appointButton}>Позвонить</div>
          <div className={style.discount}>
            позвони сейчас <br /> и получи скидку 10%
          </div>
        </a>
      </div>
      <div className={style.photoContainer}>
        <figure>
          <img src="/images/maria.png" alt="Мастер Мария"></img>
          <figcaption className={style.photoText}>Maria</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Maria;
