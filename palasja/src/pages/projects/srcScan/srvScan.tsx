import style from './srvScan.module.css';
import {
  Bak,
  CheckTaskSync,
  ErrorLoadScan,
  FreeSpace,
  ProgError,
  RuningProgram,
  Unlodafile,
} from './code_en';
import { useTranslation } from 'react-i18next';

const SrvScan = () => {
  const { t } = useTranslation();
  return (
    <>
      {t('proj.srvScan.desc')
        .split('/n')
        .map((s) => (
          <p>{s}</p>
        ))}
      <ul>
        {[...new Array(8)].map((_v, i) => <li>{i+1} - {t(`proj.srvScan.params.${i+1}`)}</li>)}
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
