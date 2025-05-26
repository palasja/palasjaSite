import MS2778 from 'assets/sertificates/MS2778.png';
import softline from 'assets/sertificates/softline_25022021.png';
import rss from 'assets/sertificates/RSSshool_20092022.png';
import MS6419B from 'assets/sertificates/MS-6419B.png';
import style from './cw.module.css';
import { useTranslation } from 'react-i18next';

const CW = () => {
  const { t } = useTranslation();
  return(
    <>
      <h3>{t("cw.name")}</h3>
      <div>
        <a>Linked: https://www.linkedin.com/in/palasja</a>
        <a>GitHub: https://github.com/palasja</a>
        <a>Email: palasja@gmail.com</a>
      </div>

<section>
<h4>{t("cw.lang.language")}</h4>
    <ul>
      <li>{t("cw.lang.belarus")}</li>
      <li>{t("cw.lang.russian")}</li>
      <li>{t("cw.lang.english")}</li>
    </ul>
</section>

<section>
<h4>{t("cw.education.education")}</h4>
<div>
  <div>
    <p>{t("cw.education.univerrsity")}</p>
    <p>{t("cw.education.hightQality")}</p>
  </div>
  <div>
    {t("cw.education.universityDate")}
  </div>
</div>
<div>
  <div>
    <p>{t("cw.education.college")}</p>
    <p>{t("cw.education.specialization")}</p>
  </div>
  <div>
    {t("cw.education.collegeDate")}
  </div>
</div>
</section>

			
<section>
<h4>{t("cw.skils.skils")}</h4>
<ul>
  <li><span>{t("cw.skils.languages")}:</span> SQL, JS, C#, SQL, Typescript, CSS, HTML5, Node.js, Batch</li>
  <li><span>{t("cw.skils.frameworks")}:</span> Express, ASP.NET Core, React</li>
  <li><span>{t("cw.skils.tools")}:</span> Enterprise Manager, MS Office, IBExpert, Vmware Workstation, VSphere, Sequelize, Git, Vite</li>
  <li><span>{t("cw.skils.platforms")}:</span> Visual Studio, Visual Studio Code</li>
  <li><span>{t("cw.skils.softSkils")}:</span> Self-organization, Stress resilience, Problem solving, Adaptability and flexibility</li>
</ul>
</section>
<section>
<h4>{t("cw.experiance.experiance")}</h4>
    <p>{t("cw.experiance.factory")} - {t("cw.experiance.factoryDate")}</p>
    <p>{t("cw.experiance.ivc")} - {t("cw.experiance.ivcDate")}</p>
</section>

<section>
<h4>Projects</h4>
  <a></a>
</section>

<section>
<h4>{t("cw.certificates")}</h4>
    <figure>
      <img src={rss}></img>
      <figcaption>THE RS SCHOOL - JAVASCRIPT/FRONT-END 2022Q1</figcaption>
    </figure>
        <figure>
      <img src={MS2778}></img>
      <figcaption>MS2778 - Quiring and modifying data in Microsoft SQL Server 2008 with transact-SQL</figcaption>
    </figure>
        <figure>
      <img src={softline}></img>
      <figcaption>Softline - Advanced C#/.Net</figcaption>
    </figure>
        <figure>
      <img src={MS6419B}></img>
      <figcaption>MS-6419B -	Configuring, managing and Maintaining windows server 2008-based servers</figcaption>
    </figure>
</section>
    </>
  );
}

export default CW;