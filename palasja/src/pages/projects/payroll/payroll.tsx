import style from './payroll.module.css';
import image1 from 'assets/projects/payroll/1.png';
import image2 from 'assets/projects/payroll/2.png';
import image3 from 'assets/projects/payroll/3.png';
import { useTranslation } from 'react-i18next';
import ProjectName from '../../../components/projectName';
const Payroll = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName='Payroll'/>
      Проект написан на С# и состоит из двух частей Payroll и Contract. Оба проекта разделелы на
      логические слои: бизнесс логика, доступ к данным, уровень представления. Данные хранятся на
      MSSQL Server. Для передачи данных между уровнями используется AutoMapper. Уровень
      представления сделан с использованием RazorPage. Проект Payroll написан в виде консольного
      приложения. Он использует ExcelDataReader для чтения xls документа. Документ сохраняестся базу
      данных. Проект Contract на уравне представления написан на Razor. Для авторизации используется
      Scaffold Identity.
      <img className={style.image}  src={image1}></img>
      <img className={style.image}  src={image2}></img>
      <img className={style.image}  src={image3}></img>
    </>
  );
};

export default Payroll;
