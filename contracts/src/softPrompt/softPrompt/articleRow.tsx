import style from './../softPrompt.module.css';
import { EditIcon, RemoveIcon } from '../../components/icons/icons';
import RemoveAgreePortal from '../../components/modal/remove/removeModal';
import { ArticlesName } from '../../helpers/contractTypes';
import { useRemoveEntity } from '../../hooks/useRemoveEntity';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDeleteSoftArticleMutation } from '../../redux/slices/softInfoArticleRTK';
import { getArticleId, choseArticleId, changeActionArticle } from '../../redux/slices/softSlice';

const ArticleRow = ({ article }: { article: ArticlesName }) => {
  const dispatch = useAppDispatch();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<string>('');
  const choosenArticleId = useAppSelector(getArticleId);
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const showHandler = (id: string) => {
    dispatch(choseArticleId(id));
    dispatch(changeActionArticle('show'));
  };
  const changeHandler = async (id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeActionArticle('change'));
    dispatch(choseArticleId(id));
    toTop();
  };
  const [deleteArticleInfo] = useDeleteSoftArticleMutation();
  return (
    <div
      onClick={() => showHandler(article.id)}
      key={article.id}
      className={style.articleNameContainer}
    >
      <span onClick={toTop} className={style.articleName}>
        {article.name}
      </span>
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

            if (choosenArticleId === removeId) {
              dispatch(choseArticleId(undefined));
              dispatch(changeActionArticle('show'));
            }
          }}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </div>
  );
};

export default ArticleRow;
