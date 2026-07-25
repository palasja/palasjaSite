import style from './../softPrompt.module.css';
import { SoftArticle, SoftArticleLink } from '../../helpers/contractTypes';
import { SOFT_INFO_IMAGE_PREFIX, SOFT_INFO_SPLITER_IMAGE } from '../../helpers/constants';
import SoftInfoArticleLink from './softInfoArticleLink';
import ImageContainer from './imageContainer';
import TextField from './textField';

const Info = ({
  article,
  links,
}: {
  article: SoftArticle;
  links: SoftArticleLink[] | undefined;
}) => {
  const imagePrefRegExp = new RegExp(SOFT_INFO_IMAGE_PREFIX);
  return (
    <>
      <h3 className={style.infoHead}>{article?.name}</h3>
      <div className={style.linkContainer}>{links && <SoftInfoArticleLink links={links} />}</div>

      <section>
        {article?.info.split(SOFT_INFO_SPLITER_IMAGE).map((s) => {
          return imagePrefRegExp.test(s) ? <ImageContainer img={s} /> : <TextField text={s} />;
        })}
      </section>
    </>
  );
};

export default Info;
