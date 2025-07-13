import style from './srvScan.module.css';
import { useTranslation } from 'react-i18next';
import { splitLineGetParagragh } from '../../../helpers/heper';
import { Outlet, useLocation } from 'react-router';

const SrvScan = () => {
  const reg = new RegExp(/SrvScan$/i);
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      {reg.test(location.pathname) && (
        <>
          <h3>{t('proj.projectDesc')} SrvScan</h3>
          {splitLineGetParagragh(t('proj.srvScan.desc'))}
          {[...new Array(8)].map((_v, i) => (
            <li key={i}>
              {i + 1} - {t(`proj.srvScan.params.${i + 1}`)}
            </li>
          ))}
        </>
      )}
      <Outlet />
    </>
  );
};

export default SrvScan;
