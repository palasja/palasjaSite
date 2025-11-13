import { useState } from 'react';
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
import RemoveAgreePortal from '../components/modal/removeModal';
import {
  useDeleteSoftArticleMutation,
  useGetSoftArticleQuery,
} from '../redux/slices/softInfoArticleRTK';
import { useGetSoftArticleLinksQuery } from '../redux/slices/softInfoArticleLinkRTK';
import SoftInfoArticleForm from './softPromptArticleForm';
import { skipToken } from '@reduxjs/toolkit/query';

type ArtileAction = 'show' | 'change' | 'new';
type SoftInfoArticleProps = {
  articleId: string | undefined;
  action: ArtileAction;
  softId: string | undefined;
  callback: (articleId: string) => void;
};

const ImageContainer = ({ img }: { img: string }) => {
  return (
    <div area-soft-info="">
      <img src={img}></img>
    </div>
  );
};

const TextField = ({ text }: { text: string | undefined }) => {
  return <div>{text ? text : ''}</div>;
};

const SoftInfoArticle = ({
  articleId,
  action,
  softId,
  callback = () => {},
}: SoftInfoArticleProps) => {
  const {
    data: article,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetSoftArticleQuery(articleId ?? skipToken);
  const {
    data: links,
    isLoading: isLoadingLinks,
    isFetching: isFetchingLinks,
    isSuccess: isSuccessLinks,
  } = useGetSoftArticleLinksQuery(articleId ?? skipToken);
  return (
    <>
      {action === 'new' && softId && (
        <SoftInfoArticleForm
          changingSoftArticle={undefined}
          changingSoftLinks={undefined}
          softInfoId={softId}
          // clearCallback={() => setActionArticle(undefined)}
          clearCallback={callback}
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
              // clearCallback={() => setActionArticle('show')}
              clearCallback={callback}
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
      <h3>{article?.name}</h3>
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
      <aside>
        {links &&
          links.map((a, i) => {
            return (
              <a href={a.url} key={i}>
                {a.name}
              </a>
            );
          })}
      </aside>
    </>
  );
};

const SoftPrompt = () => {
  const { data: softinfoExample = [], isLoading, isFetching } = useGetSoftInfoQuery();
  const softInfo = softinfoExample;
  const [changingSoft, setChangingSoft] = useState<SoftInfoType>();
  const [choosenArticleId, setChoosenArticleId] = useState<string | undefined>();
  const [actionArticle, setActionArticle] = useState<ArtileAction>();
  const [chosenSoftId, setChosenSoftId] = useState<string>();
  const showHandler = (id: string) => {
    setChoosenArticleId(id);
    setActionArticle('show');
  };
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [deleteSoftInfo] = useDeleteSoftInfoMutation();
  const [deleteArticleInfo] = useDeleteSoftArticleMutation();
  const changeHandler = async (id: string, e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setActionArticle('change');
    setChoosenArticleId(id);
  };
  const newHandler = (softId: string) => {
    setChosenSoftId(softId);
    setActionArticle('new');
  };

  const ArticleRow = ({ article }: { article: ArticlesName }) => {
    const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
      useRemoveEntity<string>('');
    return (
      <li onClick={() => showHandler(article.id)} key={article.id}>
        {article.name}
        <input type="button" onClick={(e) => changeHandler(article.id, e)} value="Change" />
        <input
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRemoveId(article.id);
            setIsShowRemoveModal(true);
          }}
          value="Delete"
        />

        {isShowRemoveModal && (
          <RemoveAgreePortal
            remove={() => {
              deleteArticleInfo(removeId);
              setChoosenArticleId(undefined);
              if (choosenArticleId === removeId) setActionArticle(undefined);
            }}
            close={() => setIsShowRemoveModal(false)}
          />
        )}
      </li>
    );
  };

  const SoftInfo = ({ soft }: { soft: SoftInfoType }) => {
    return (
      <div key={soft.id}>
        <li>
          {soft.name}
          <input type="button" onClick={() => newHandler(soft.id)} value="Новая заметка" />
          <input
            type="button"
            onClick={() => {
              setRemoveId(parseInt(soft.id));
              setIsShowRemoveModal(true);
            }}
            value="Delete"
          />
        </li>
        <ul>
          {soft.softArticle.map((an) => (
            <ArticleRow article={an} key={an.id} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <h2>Информация по программам </h2>
      <SoftPromptForm softInfo={changingSoft} clearCallback={() => setChangingSoft(undefined)} />
      <aside>
        <ul>
          {softInfo.map((soft, i) => {
            return <SoftInfo soft={soft} />;
          })}
        </ul>
      </aside>

      {actionArticle && (
        <SoftInfoArticle
          articleId={choosenArticleId}
          action={actionArticle}
          softId={chosenSoftId}
          callback={(articleId: string) => {
            setChoosenArticleId(articleId);
            setActionArticle('show');
          }}
        />
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => {
            deleteSoftInfo(removeId);
            setChosenSoftId(undefined);
            if (chosenSoftId === removeId.toString()) setActionArticle(undefined);
          }}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
};

export default SoftPrompt;
