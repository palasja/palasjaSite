import { useEffect } from 'react';
import {
  ArticlesName,
  SoftArticle,
  SoftArticleLink,
  SoftInfo as SoftInfoType,
} from '../helpers/contractTypes';
import { SOFT_INFO_IMAGE_PREFIX, SOFT_INFO_SPLITER_IMAGE } from '../helpers/constants';
import SoftPromptForm from './softPromptForm';
import { useDeleteSoftInfoMutation, useGetSoftInfoQuery } from '../redux/slices/softInfoRTK';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import RemoveAgreePortal from '../components/modal/remove/removeModal';
import {
  useDeleteSoftArticleMutation,
  useGetSoftArticleQuery,
} from '../redux/slices/softInfoArticleRTK';
import { useGetSoftArticleLinksQuery } from '../redux/slices/softInfoArticleLinkRTK';
import SoftInfoArticleForm from './softPromptArticleForm';
import { skipToken } from '@reduxjs/toolkit/query';
import { AddIcon, EditIcon, RemoveIcon } from '../components/icons/icons';
import style from './softPrompt.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { choseAct, getChosenchosenAction } from '../redux/slices/orgsSlice';

import {
  changeSoft,
  changeActionArticle,
  choseArticleId,
  choseSoftId,
  getActionArticle,
  getArticleId,
  getChangingSoft,
  getSoftId,
} from '../redux/slices/softSlice';

const ImageContainer = ({ img }: { img: string }) => {
  return (
    <div area-soft-info="" className={style.imageCont}>
      <img src={img}></img>
    </div>
  );
};

const TextField = ({ text }: { text: string | undefined }) => {
  return <div>{text ? text : ''}</div>;
};

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
      {links && <SoftInfoArticleLink links={links} />}
      <section>
        {article?.info.split(SOFT_INFO_SPLITER_IMAGE).map((s) => {
          return imagePrefRegExp.test(s) ? <ImageContainer img={s} /> : <TextField text={s} />;
        })}
      </section>
    </>
  );
};

const SoftInfoArticleLink = ({ links }: { links: SoftArticleLink[] }) => {
  return (
    <>
      <aside className={style.link}>
        {links &&
          links.map((a, i) => {
            return (
              <a href={a.url} key={i} target="_blank">
                {a.name}
              </a>
            );
          })}
      </aside>
    </>
  );
};
const ArticleRow = ({ article }: { article: ArticlesName }) => {
  const dispatch = useAppDispatch();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<string>('');
  const choosenArticleId = useAppSelector(getArticleId);
  const showHandler = (id: string) => {
    dispatch(choseArticleId(id));
    dispatch(changeActionArticle('show'));
  };
  const changeHandler = async (id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeActionArticle('change'));
    dispatch(choseArticleId(id));
  };
  const [deleteArticleInfo] = useDeleteSoftArticleMutation();
  return (
    <div
      onClick={() => showHandler(article.id)}
      key={article.id}
      className={style.articleNameContainer}
    >
      <span className={style.articleName}>{article.name}</span>
      <span onClick={(e) => changeHandler(article.id, e)}>
        <EditIcon />
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setRemoveId(article.id);
          setIsShowRemoveModal(true);
        }}
      >
        <RemoveIcon />
      </span>

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => {
            deleteArticleInfo(removeId);

            if (choosenArticleId === removeId) dispatch(changeActionArticle('show'));
            dispatch(choseArticleId(undefined));
          }}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </div>
  );
};

const SoftInfo = ({ soft }: { soft: SoftInfoType }) => {
  const [deleteSoftInfo] = useDeleteSoftInfoMutation();
  const dispatch = useAppDispatch();
  const chosenSoftId = useAppSelector(getSoftId);
  const newHandler = (softId: string) => {
    dispatch(choseSoftId(softId));
    dispatch(changeActionArticle('new'));
  };

  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  return (
    <>
      <div key={soft.id}>
        <div className={`${style.sofinfoName}`}>
          <p>{soft.name}</p>
          <AddIcon onClick={() => newHandler(soft.id)} />
          <span
            onClick={() => {
              setRemoveId(parseInt(soft.id));
              setIsShowRemoveModal(true);
            }}
          >
            <RemoveIcon />
          </span>
          <span
            onClick={() => {
              dispatch(changeSoft(soft));
              dispatch(choseAct('change'));
            }}
          >
            <EditIcon />
          </span>
        </div>
        <div className={style.articleNames}>
          {soft.softArticle.map((an) => (
            <ArticleRow article={an} key={an.id} />
          ))}
        </div>
      </div>

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => {
            deleteSoftInfo(removeId);
            dispatch(changeSoft(undefined));
            if (chosenSoftId === removeId.toString()) {
              dispatch(changeSoft(undefined));
              dispatch(changeActionArticle('show'));
            }
          }}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
};

const SoftPrompt = () => {
  const { data: softinfoExample = [], isLoading, isFetching } = useGetSoftInfoQuery();
  const softInfo = softinfoExample;

  const softAction = useAppSelector(getChosenchosenAction);
  const changingSoft = useAppSelector(getChangingSoft);
  const dispatch = useAppDispatch();
  const actionArticle = useAppSelector(getActionArticle);

  useEffect(() => {
    dispatch(choseAct('show'));
  }, []);

  const clearHandler = () => {
    dispatch(changeSoft(undefined));
    dispatch(changeActionArticle('show'));
  };
  return (
    <>
      <div className={style.head}>
        <AddIcon
          onClick={() => {
            dispatch(choseAct('add'));
          }}
        />
        <p>Информация по программам </p>
      </div>
      {softAction == 'show' && (
        <main className={style.main}>
          <aside className={style.softMenu}>
            {softInfo.map((soft, i) => {
              return <SoftInfo soft={soft} key={i} />;
            })}
          </aside>
          <section>{actionArticle && <SoftInfoArticle />}</section>
        </main>
      )}
      {softAction == 'change' && (
        <SoftPromptForm softInfo={changingSoft} clearCallback={() => clearHandler()} />
      )}
      {softAction == 'add' && (
        <SoftPromptForm softInfo={undefined} clearCallback={() => clearHandler()} />
      )}
    </>
  );
};

export default SoftPrompt;
