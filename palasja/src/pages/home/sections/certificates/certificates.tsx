import { ContentWrapper } from '../../../../components/containers/contentContainer';
// import style from './home.module.css';
import { useTranslation } from 'react-i18next';
import MS2778 from 'assets/sertificates/MS2778.png';
import softline from 'assets/sertificates/softline_25022021.png';
import rss from 'assets/sertificates/RSSshool_20092022.png';
import MS6419B from 'assets/sertificates/MS-6419B.png';
import style from './certificates.module.css';

const Certificates = () => {
  const { t } = useTranslation();
  
  return(
    <ContentWrapper>
      <div className={style.certificates}>
        <h4 className={style.head}>{t('home.cw.certificates')}</h4>
          <div className={style.inner}>
            <figure >
              <img className={style.img} src={rss}></img>
              <figcaption className={style.text}>THE RS SCHOOL - JAVASCRIPT/FRONT-END 2022Q1</figcaption>
            </figure>
            <figure>
              <img className={style.img} src={MS2778}></img>
              <figcaption className={style.text}>
                MS2778 - Quiring and modifying data in Microsoft SQL Server 2008 with transact-SQL
              </figcaption>
            </figure>
            <figure>
              <img className={style.img} src={softline}></img>
              <figcaption className={style.text}>Softline - Advanced C#/.Net</figcaption>
            </figure>
            <figure>
              <img className={style.img} src={MS6419B}></img>
              <figcaption className={style.text}>
                MS-6419B - Configuring, managing and Maintaining windows server 2008-based servers
              </figcaption>
            </figure>
          </div>
      </div>
    </ContentWrapper>
  );
}

export default Certificates