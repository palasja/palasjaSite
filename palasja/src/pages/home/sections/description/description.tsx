import style from './description.module.css'
import face from 'assets/yakubenka_face.jpg';
import { ContentWrapper } from "../../../../components/containers/contentContainer"
import { splitLineGetParagragh } from "../../../../helpers/heper"
import { useTranslation } from 'react-i18next';

const Description = () => {
    const { t } = useTranslation();
  return(
    <ContentWrapper>
      <div className={style.intro}>
        <img src={face} className={style.img}></img>
        <div className={style.text}>{splitLineGetParagragh(t('home.text'))}</div>
      </div>
    </ContentWrapper>
  )
}

export default Description