import style from './srvScan.module.css';
import {
  Bak,
  CheckTaskSync,
  ErrorLoadScan,
  FreeSpace,
  ProgError,
  Readme,
  RuningProgram,
  Unlodafile,
} from './code_en';
import { useTranslation } from 'react-i18next';

const SrvScan = () => {
  const { t } = useTranslation();
  return (
    <>
      {t('proj.srvScan.desc')
        .split('|')
        .map((s) => (
          <p>{s}</p>
        ))}
      {/* <p>{t("proj.srvScan.desc").split('.')}</p> */}
      <ul>
        <li>1 - {t('proj.srvScan.params.1')}</li>
        <li>2 - {t('proj.srvScan.params.2')}</li>
        <li>3 - {t('proj.srvScan.params.3')}</li>
        <li>4 - {t('proj.srvScan.params.4')}</li>
        <li>5 - {t('proj.srvScan.params.5')}</li>
        <li>6 - {t('proj.srvScan.params.6')}</li>
        <li>7 - {t('proj.srvScan.params.7')}</li>
        <li>8 - {t('proj.srvScan.params.8')}</li>
      </ul>
      <details>
        <summary>FreeSpace</summary>
        <pre>{FreeSpace}</pre>
      </details>
      <details>
        <summary>Unlodafile</summary>
        <pre>{Unlodafile}</pre>
      </details>
      <details>
        <summary>Bak</summary>
        <pre>{Bak}</pre>
      </details>
      <details>
        <summary>CheckTaskSync</summary>
        <pre>{CheckTaskSync}</pre>
      </details>
      <details>
        <summary>ErrorLoadScan</summary>
        <pre>{ErrorLoadScan}</pre>
      </details>
      <details>
        <summary>RuningProgram</summary>
        <pre>{RuningProgram}</pre>
      </details>
      <details>
        <summary>ProgError</summary>
        <pre>{ProgError}</pre>
      </details>
    </>
  );
};

export default SrvScan;
