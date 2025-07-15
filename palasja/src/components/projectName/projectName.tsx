import { useTranslation } from 'react-i18next';
import style from './projectName.module.css'

type ProjectName = {
  projName: string
}

const ProjectName = ({ projName } : ProjectName) => {
  const { t } = useTranslation();
  return(
    <div className={style.head}>
      <h3 className={style.project}>{t('proj.projectDesc')}</h3> 
      <span className={style.name}>{projName}</span>
    </div>
  )
}

export default ProjectName