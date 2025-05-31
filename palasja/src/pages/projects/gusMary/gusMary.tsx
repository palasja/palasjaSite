import { useTranslation } from 'react-i18next';
import { splitLineGetParagragh } from '../../../helpers/heper';
import style from './gusMary.module.css';

const GusMary = () => {
  const { t } = useTranslation();
  return(
    <>
      <p>GusMaryHair</p>
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
    </>
  );
}

export default GusMary;