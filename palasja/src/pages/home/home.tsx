import face from 'assets/yakubenka_face.jpg';
import style from './home.module.css';
import { useTranslation } from 'react-i18next';
import MS2778 from 'assets/sertificates/MS2778.png';
import softline from 'assets/sertificates/softline_25022021.png';
import rss from 'assets/sertificates/RSSshool_20092022.png';
import MS6419B from 'assets/sertificates/MS-6419B.png';
import { splitLineGetParagragh } from '../../helpers/heper';
import { Link } from 'react-router';
import Conteiner from '../../conteiner';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={style.intro}>
      <img src={face} className={style.img}></img>
      {splitLineGetParagragh(t('home.text'))}
      </div>
      <>
        {/* <h3>{t('home.cw.name')}</h3>
        <div>
          <a>Linked: https://www.linkedin.com/in/palasja</a>
          <a>GitHub: https://github.com/palasja</a>
          <a>Email: palasja@gmail.com</a>
        </div> */}
{/*-----------------------------------------------------------------------------------*/}
        <section className={style.skils}>
          <h4 className={style.head}>{t('home.cw.skils.skils')}</h4>
          <ul>
            <li className={style.text}>
              <span>{t('home.cw.skils.languages')}:</span> SQL, JS, C#, SQL, Typescript, CSS, HTML5,
              Node.js, Batch
            </li>
            <li className={style.text}>
              <span>{t('home.cw.skils.frameworks')}:</span> Express, ASP.NET Core, React
            </li>
            <li className={style.text}>
              <span>{t('home.cw.skils.tools')}:</span> Enterprise Manager, MS Office, IBExpert, Vmware
              Workstation, VSphere, Sequelize, Git, Vite
            </li>
            <li className={style.text}>
              <span>{t('home.cw.skils.platforms')}:</span> Visual Studio, Visual Studio Code
            </li>
            <li className={style.text}>
              <span>{t('home.cw.skils.softSkils')}:</span> Self-organization, Stress resilience, Problem
              solving, Adaptability and flexibility
            </li>
          </ul>
        </section>
{/*-----------------------------------------------------------------------------------*/}
        <section className={style.education}>
          <h4 className={style.head_}>{t('home.cw.education.education')}</h4>
          <div className={style.inner}>
            <div className={style.inner}>
              <div className={style.date}>{t('home.cw.education.collegeDate')}</div>
              <div>
                <p className={style.specialization}>{t('home.cw.education.specialization')}</p>
                <p>{t('home.cw.education.college')}</p>
               
              </div>
            </div>
            <div className={style.inner}>
              <div className={style.date}>{t('home.cw.education.universityDate')}</div>
              <div>
                <p className={style.specialization}>{t('home.cw.education.hightQality')}</p>
                <p>{t('home.cw.education.univerrsity')}</p>
              </div>
            </div>
          </div>
        </section>
{/*-----------------------------------------------------------------------------------*/}
        <section className={style.language}>
          <h4 className={style.head}>{t('home.cw.lang.language')}</h4>
          <ul>
            <li className={style.text}>{t('home.cw.lang.belarus')}</li>
            <li className={style.text}>{t('home.cw.lang.russian')}</li>
            <li className={style.text}>{t('home.cw.lang.english')}</li>
          </ul>
        </section>
{/*-----------------------------------------------------------------------------------*/}
        <section className={style.experiance}>

          <h4 className={style.head_}>{t('home.cw.experiance.experiance')}</h4>
            <div className={style.inner}>
              <div className={style.inner}>
                <p className={style.text_}>{t('home.cw.experiance.factory')}</p>
                <p className={style.post}>{t('home.cw.experiance.factoryPost')}</p>
              </div>
              <p className={style.date}>{t('home.cw.experiance.factoryDate')}</p>
            </div>
          
          <div className={style.inner_}>
            <p className={style.text_}>{t('home.cw.experiance.ivc')}</p>
            <p className={style.post}>{t('home.cw.experiance.ivcPost')}</p>
            <p className={style.date}>{t('home.cw.experiance.ivcDate')}</p>
          </div>

          <ul>
            <li>
              Установка и настройка MS SQL Server 2003/2008. Администрирование БД. Настройка
              резервного копирования баз.
            </li>
            <li>
              Установка и настройка Firebird SQL Server 2.1/2.5. Администрирование БД. Настройка
              резервного копирования баз.
            </li>
            <li>Установка и настройка Oracle Database. Администрирование БД.</li>
            <li>
              Установка и настройка ОС семейства Windows (XP, 7, 8, 10) и Windows Server (2003,
              2012).
            </li>
            <li>
              Установка и настройка приклодного ПО (финансовая система, банки, порталы, средства
              криптозащиты).
            </li>
            <li>
              Установка и настройка переферийных устройств (МФУ, сканеры, принтеры, ID считываетли).
            </li>
            <li>Разворачивание ОС на системах виртуализации (VMWare, VSphere).</li>
            <li>Регламентные проверки и обслуживание оборудования. Диагностика неисправностей</li>
            <li>
              Консультации и обучение пользователей по работе с ПО и оборудованием. Реклама новых
              программных продуктов компании.
            </li>
            <li>
              Прокладывание, настройка и обслуживание локальной сети и настройка сетевого
              оборудования.
            </li>
            <li>
              Настройка и обслуживание каналов связи (Radius, Argus, Dial-Up, ADSL, FTP, VPN).
            </li>
            <li>
              Автоматизация рабочих процессов: Анализ логов работы ПО, Диагностика копирования и
              хранения бэкапов БД, Создание отчётов по состоянию ПК
            </li>
            <li>
              Front-End разработка: Создание и стилизация пользовательского интерфейса, Создание
              табличных форм, Подписание документов сертификатом X.509 и отправка документов на
              сервер.
            </li>
          </ul>
        </section>
{/*-----------------------------------------------------------------------------------*/}
        {/* <section>
                <h3>Проекты</h3>
                <article>
                  <li><Link to="projects/srvScan">SrvScan</Link></li>
                  <p>{t('home.projects.srvScan.desc1')}</p>
                  <p>{t('home.projects.srvScan.desc2')}</p>
                </article>
                <article>
                  <li><Link to="projects/getInfo">GetInfo</Link></li>
                  <p>{t('home.projects.getInfo.desc1')}</p>
                  <p>{t('home.projects.getInfo.desc2')}</p>
                </article>
                <article>
                  <li><Link to="projects/gusmary">GusMary</Link></li>
                  {splitLineGetParagragh(t('home.projects.gusMary.desc'))}
                </article>
                <article>
                  <li><Link to="projects/contracts">Contracts</Link></li>
                  {splitLineGetParagragh(t('home.projects.contracts.desc'))}
                </article>
                                <article>
                  <li><Link to="projects/payroll">Payroll</Link></li>
                  {splitLineGetParagragh(t('home.projects.payroll.desc'))}
                </article>
        </section>        
        <section>
          <h4>Projects</h4>
          <a></a>
        </section> */}
{/*-----------------------------------------------------------------------------------*/}
        <section>
          <h4>{t('home.cw.certificates')}</h4>
          <figure>
            <img src={rss}></img>
            <figcaption>THE RS SCHOOL - JAVASCRIPT/FRONT-END 2022Q1</figcaption>
          </figure>
          <figure>
            <img src={MS2778}></img>
            <figcaption>
              MS2778 - Quiring and modifying data in Microsoft SQL Server 2008 with transact-SQL
            </figcaption>
          </figure>
          <figure>
            <img src={softline}></img>
            <figcaption>Softline - Advanced C#/.Net</figcaption>
          </figure>
          <figure>
            <img src={MS6419B}></img>
            <figcaption>
              MS-6419B - Configuring, managing and Maintaining windows server 2008-based servers
            </figcaption>
          </figure>
        </section>
      </>
    </>

  );
};

export default Home;
