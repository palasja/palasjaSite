import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetSoftArticleLinksQuery } from '../../redux/slices/softInfoArticleLinkRTK';
import { useGetSoftArticleQuery } from '../../redux/slices/softInfoArticleRTK';
import {
  getArticleId,
  getActionArticle,
  getSoftId,
  choseArticleId,
  changeActionArticle,
} from '../../redux/slices/softSlice';
import SoftInfoArticleForm from '../formComponents/softPromptArticleForm';
import Info from './info';

const SoftInfoArticle = () => {
  const dispatch = useAppDispatch();
  const articleId = useAppSelector(getArticleId);
  const action = useAppSelector(getActionArticle);
  const softId = useAppSelector(getSoftId);
  const { data: article, isSuccess } = useGetSoftArticleQuery(articleId ?? skipToken);
  const { data: links, isSuccess: isSuccessLinks } = useGetSoftArticleLinksQuery(
    articleId ?? skipToken
  );
  return (
    <>
      {action === 'new' && softId && (
        <SoftInfoArticleForm
          changingSoftArticle={undefined}
          changingSoftLinks={undefined}
          softInfoId={softId}
          clearCallback={() => {
            dispatch(choseArticleId(articleId));
            dispatch(changeActionArticle('show'));
          }}
        />
      )}

      {isSuccess && isSuccessLinks && (
        <>
          {action === 'show' && article && <Info article={article} links={links} />}
          {action === 'change' && article && (
            <SoftInfoArticleForm
              changingSoftArticle={article}
              changingSoftLinks={links}
              softInfoId={article.softInfoId}
              clearCallback={() => {
                dispatch(choseArticleId(articleId));
                dispatch(changeActionArticle('show'));
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SoftInfoArticle;
