import { useTranslation } from 'react-i18next';
import style from './code.module.css';
type CodeProps = {
  name: string;
  code: string;
};
const Code = ({ name, code }: CodeProps) => {
  const { t } = useTranslation();
  return (
    <>
      <h3>
        {t('proj.projectDesc')} {name}
      </h3>
      <pre className={style.code}>{code}</pre>
    </>
  );
};

export default Code;
