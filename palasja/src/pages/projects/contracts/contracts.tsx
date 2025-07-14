import { useTranslation } from 'react-i18next';
import style from './contracts.module.css';

const Contracts = () => {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('proj.projectDesc')}Contracts</h3>
    </>
  );
};

export default Contracts;
