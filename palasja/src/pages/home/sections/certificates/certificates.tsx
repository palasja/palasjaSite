import { ContentWrapper } from '../../../../components/containers/contentContainer';
import MS2778 from 'assets/certificates/MS2778.png';
import softline from 'assets/certificates/softline_25022021.png';
import softline2 from 'assets/certificates/softline_12062014.png';
import rss from 'assets/certificates/RSSshool_20092022.png';
import MS6419B from 'assets/certificates/MS-6419B.png';
import AWS_Fundamentals from 'assets/certificates/AWS_Fundamentals.png';
import AWSTraningCertification from 'assets/certificates/AWS_Traning_Certification.png';

import style from './certificates.module.css';
import { Carousel, useCarousel } from 'nuka-carousel';

const CustomArrows = () => {
  const { currentPage, totalPages, wrapMode, goBack, goForward } =
    useCarousel();

  const allowWrap = wrapMode === 'wrap';
  const enablePrevNavButton = allowWrap || currentPage > 0;
  const enableNextNavButton = allowWrap || currentPage < totalPages - 1;

  return (
    <div className={style.arrowContainer}>
      <div className={`${style.arrowNext} ${enableNextNavButton ? '' : style.arrowDisable}`} onClick={goForward}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>
      </div>
      <div className={`${style.arrowPrev} ${enablePrevNavButton ? '' : style.arrowDisable}`} onClick={goBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>        
      </div>
    </div>
  );
}

const Certificates = () => {
  return (
    <ContentWrapper>
      <div className={style.certificates}>
        <Carousel showDots  autoplayInterval={5000} showArrows arrows={<CustomArrows />}>
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
