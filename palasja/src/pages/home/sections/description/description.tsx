import style from './description.module.css';
import face from 'assets/yakubenka_face.jpg';
import { ContentWrapper } from '../../../../components/containers/contentContainer';
import { splitLineGetParagragh } from '../../../../helpers/heper';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDetail } from '../../../../hooks/detail/useDetail';

const Description = () => {
  const { t } = useTranslation();
  // const [isShowMobileDetail, setIsShowMibileDetail] = useState(false);
  const {Detail, isShowMobileDetail} = useDetail();
  return (
    <ContentWrapper>
      <div className={style.intro}>
        <img src={face} className={style.img}></img>
        <div>
          <div className={`${style.text} ${isShowMobileDetail ?  "" : style.hide}`}>
          {splitLineGetParagragh(t('home.text'))}
          </div>
          <Detail />
        </div>
        
      </div>
    </ContentWrapper>
  );
};

export default Description;
