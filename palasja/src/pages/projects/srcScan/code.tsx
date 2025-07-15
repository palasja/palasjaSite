import { useTranslation } from 'react-i18next';
import style from './code.module.css';
import ProjectName from '../../../components/projectName';
type CodeProps = {
  name: string;
  code: string;
};
const Code = ({ name, code }: CodeProps) => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName={name}/>
      <pre className={style.code}>{code}</pre>
    </>
  );
};

export default Code;
