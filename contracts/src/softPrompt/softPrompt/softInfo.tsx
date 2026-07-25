import style from './../softPrompt.module.css';
import { AddIcon, RemoveIcon, EditIcon } from '../../components/icons/icons';
import RemoveAgreePortal from '../../components/modal/remove/removeModal';
import { useRemoveEntity } from '../../hooks/useRemoveEntity';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDeleteSoftInfoMutation } from '../../redux/slices/softInfoRTK';
import {
  getSoftId,
  choseSoftId,
  changeActionArticle,
  changeSoft,
  changeActionSoft,
} from '../../redux/slices/softSlice';
import { SoftInfo as SoftInfoType } from './../../helpers/contractTypes';
import ArticleRow from './articleRow';

const SoftInfo = ({ soft }: { soft: SoftInfoType }) => {
  const [deleteSoftInfo] = useDeleteSoftInfoMutation();
  const dispatch = useAppDispatch();
  const chosenSoftId = useAppSelector(getSoftId);
  const newArticleHandler = (softId: string) => {
    dispatch(choseSoftId(softId));
    dispatch(changeActionArticle('new'));
  };
  const removeHandler = (softId: string) => {
    setRemoveId(parseInt(soft.id));
    setIsShowRemoveModal(true);
  };
  const changeHandler = () => {
    dispatch(changeSoft(soft));
    dispatch(changeActionSoft('change'));
  };
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  return (
    <>
      <div key={soft.id}>
        <div className={`${style.softNameContainer}`}>
          <AddIcon onClick={() => newArticleHandler(soft.id)} />
          <p className={style.softName}>{soft.name}</p>

          <span onClick={() => removeHandler(soft.id)}>
            <RemoveIcon />
          </span>
          <span onClick={() => changeHandler()}>
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

export default SoftInfo;
