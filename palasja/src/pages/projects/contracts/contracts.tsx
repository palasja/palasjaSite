import { useTranslation } from 'react-i18next';
import style from './contracts.module.css';
import ProjectName from '../../../components/projectName';
import image1 from 'assets/projects/contracts/login.png';
import image2 from 'assets/projects/contracts/startpage.png';
import image3 from 'assets/projects/contracts/act.png';
import image4 from 'assets/projects/contracts/stats.png';
import { splitLineGetParagragh } from '../../../helpers/heper';

const Contracts = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName='Contracts' link='https://palasja.by/'/>
      {splitLineGetParagragh(t('proj.contracts.desc'))}
      <ul>
        <li>vite</li>
        <li>typescript</li>
        <li>redux</li>
        <li>redux toolkit</li>
        <li>react-hook-form</li>
        <li>react-router</li>
        <li>material-react-table</li>
        <li>express </li>
        <li>sequelize </li>
        <li>vitest</li>
        <li>jest</li>
        <li>msw</li>
      </ul>
      <img className={style.image} src={image1}></img>
      <img className={style.image} src={image2}></img>
      <img className={style.image} src={image3}></img>
      <img className={style.image} src={image4}></img>
    </>
  );
};

export default Contracts;
