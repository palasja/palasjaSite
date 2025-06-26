import { useTranslation } from 'react-i18next';

type CodeProps = {
  name: string,
  code: string
}
const Code = ({name, code}: CodeProps) => {
  const { t } = useTranslation(); 
  return(
    <>
      <h3>{t('proj.projectDesc')} {name}</h3>
      <pre>{code}</pre>
    </>
  );
}

export default Code