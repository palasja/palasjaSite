import { useTranslation } from 'react-i18next';
import { splitLineGetParagragh } from '../../../helpers/heper';
import style from './gusMary.module.css';
import image1 from 'assets/projects/gusmary/1.png';
import image2 from 'assets/projects/gusmary/2.png';
import ProjectName from '../../../components/projectName';

const GusMary = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName='GusMaryHair'/>
      {splitLineGetParagragh(t('proj.gusmary.desc'))}
      <ul>
        <li>vite</li>
        <li>typescript</li>
        <li>react-calendar</li>
        <li>react-hook-form</li>
        <li>react-slick</li>
        <li>express </li>
        <li>sequelize </li>
      </ul>
      <img src={image1}></img>
      <img src={image2}></img>
    </>
  );
};

export default GusMary;
