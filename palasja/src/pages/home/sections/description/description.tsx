import style from './description.module.css'
import face from 'assets/yakubenka_face.jpg';
import { ContentWrapper } from "../../../../components/containers/contentContainer"
import { splitLineGetParagragh } from "../../../../helpers/heper"
import { useTranslation } from 'react-i18next';

const Description = () => {
    const { t } = useTranslation();
  return(
    <ContentWrapper className={style.intro}>
        <img src={face} className={style.img} style={{ height: '100px', float: 'left' }}></img>
        {splitLineGetParagragh(t('home.text'))}
    </ContentWrapper>
  )
}

export default Description