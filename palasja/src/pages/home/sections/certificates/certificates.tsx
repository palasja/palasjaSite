import { ContentWrapper } from '../../../../components/containers/contentContainer';
import MS2778 from 'assets/certificates/MS2778.png';
import softline from 'assets/certificates/softline_25022021.png';
import softline2 from 'assets/certificates/softline_12062014.png';
import rss from 'assets/certificates/RSSshool_20092022.png';
import MS6419B from 'assets/certificates/MS-6419B.png';
import AWS_Fundamentals from 'assets/certificates/AWS_Fundamentals.png';
import techFundamentals from 'assets/certificates/tech_fundamentals.png';
import AWSTraningCertification from 'assets/certificates/AWS_Traning_Certification.png';

import style from './certificates.module.css';
import { Carousel } from 'nuka-carousel';

const Certificates = () => {

  return (
    <ContentWrapper>
      <div className={style.certificates}>
        <Carousel showDots autoplay={true} autoplayInterval={5000} >
          <figure className={style.figura} >
            <img className={style.img} src={rss} alt='THE RS SCHOOL - JAVASCRIPT/FRONT-END 2022Q1'></img>
            <figcaption className={style.text}>THE RS SCHOOL - JAVASCRIPT/FRONT-END 2022Q1</figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={MS2778} alt='Quiring and modifying data in Microsoft SQL Server 2008 with transact-SQL'></img>
            <figcaption className={style.text}>
              MS2778 - Quiring and modifying data in Microsoft SQL Server 2008 with transact-SQL
            </figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={softline} alt='Advanced C#/.Net'></img>
            <figcaption className={style.text}>Softline - Advanced C#/.Net</figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={MS6419B} alt='Configuring, managing and Maintaining windows server 2008-based servers'></img>
            <figcaption className={style.text}>
              MS-6419B - Configuring, managing and Maintaining windows server 2008-based servers
            </figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={softline2} alt='Создание запросов MS SQL 2008 с испошьзованием языка Transact-SQL'></img>
            <figcaption className={style.text}>
              MS2778 - Создание запросов MS SQL 2008 с испошьзованием языка Transact-SQL
            </figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={AWS_Fundamentals} alt='AWS Fundamentals'></img>
            <figcaption className={style.text}>
              THE RS SCHOOL - AWS Fundamentals
            </figcaption>
          </figure>
          <figure className={style.figura}>
            <img className={style.img} src={techFundamentals} alt='Tech Fundamentals'></img>
            <figcaption className={style.text}>
              Tech Fundamentals
            </figcaption>
          </figure>
                    <figure className={style.figura}>
            <img className={style.img} src={AWSTraningCertification} alt='AWS Training & Certification'></img>
            <figcaption className={style.text}>
              AWS Training & Certification
            </figcaption>
          </figure>
        </Carousel>
      </div>
    </ContentWrapper>
  );
};

export default Certificates;
