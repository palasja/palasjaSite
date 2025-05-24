import MS2778 from 'assets/sertificates/MS2778.png';
import softline from 'assets/sertificates/softline_25022021.png';
import rss from 'assets/sertificates/RSSshool_20092022.png';
import MS6419B from 'assets/sertificates/MS-6419B.png';
import style from './cw.module.css';

const CW = () => {
  return(
    <>
      <h3>Yakubenka Ivan</h3>
      <div>
        <a>Linked: https://www.linkedin.com/in/palasja</a>
        <a>GitHub: https://github.com/palasja</a>
        <a>Email: palasja@gmail.com</a>
      </div>

<section>
<h4>LANGUAGES</h4>
    <ul>
      <li>Russian (Native)</li>
      <li>Belarus (Native)</li>
      <li>English (B1 according to SmallTalk2Me )</li>
    </ul>
</section>

<section>
<h4>Education</h4>
<div>
  <div>
    <p>Sukhoi State Technical University of Gomel</p>
    <p>Engineer of radioelectronics</p>
  </div>
  <div>
    September 2011- January 2016
  </div>
</div>
<div>
  <div>
    <p>Gomel State Road Construction College</p>
    <p>Electronics technician</p>
  </div>
  <div>
    September 2007- June 2011
  </div>
</div>
</section>

			
<section>
<h4>Skill Summary</h4>
<ul>
  <li><span>Languages:</span> SQL, JS, C#, SQL, Typescript, CSS, HTML5, Node.js, Batch</li>
  <li><span>Frameworks:</span> Express, ASP.NET Core, React</li>
  <li><span>Tools:</span> Enterprise Manager, MS Office, IBExpert, Vmware Workstation, VSphere, Sequelize, Git, Vite</li>
  <li><span>Platforms:</span> Visual Studio, Visual Studio Code</li>
  <li><span>SoftSkils:</span> Self-organization, Stress resilience, Problem solving, Adaptability and flexibility</li>
</ul>
</section>
<section>
<h4>Work Experience</h4>
    <p>Gomel Radiofactory - 10.2011-01.2012</p>
    <p>IVC Minfina - 04.2012-06.2023</p>
</section>

<section>
<h4>Projects</h4>
  <a></a>
</section>

<section>
<h4>Certificates</h4>
  <a></a>
</section>

<section>
<h4>COURSES AND SERTIFICATES</h4>
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