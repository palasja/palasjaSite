import { useTranslation } from 'react-i18next';
import style from './projectName.module.css'

type ProjectName = {
  projName: string,
  link?: string
}

const ProjectName = ({ projName, link } : ProjectName) => {
  const { t } = useTranslation();
  return(
    <div className={style.head}>
      <h3 className={style.project}>{t('proj.projectDesc')}</h3> 
      {
        link ? <a href={link} className={style.name}>{projName}</a> : <span className={style.name}>{projName}</span>
      }
      
    </div>
  )
}

export default ProjectName