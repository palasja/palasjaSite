import { useTranslation } from 'react-i18next';
import style from './contracts.module.css';
import ProjectName from '../../../components/projectName';

const Contracts = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName='Contracts'/>
    </>
  );
};

export default Contracts;
