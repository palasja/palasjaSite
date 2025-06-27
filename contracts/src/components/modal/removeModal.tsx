import { createPortal } from 'react-dom';
import style from './removeModal.module.css';

type RemoveModalType = {
  remove: () => void
  close: () => void
}

const RemoveAgreePortal = ({ remove, close } : RemoveModalType) => {
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {e.stopPropagation(); close();}
  const removeModal = (e: React.MouseEvent<HTMLElement>) => {e.stopPropagation(); remove();}
  return(
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => closeModal(e)} data-testid='removeModal'>
          <div  className={style.main}>
            <p>Вы действительно хотитет удалить</p>
            <button onClick={(e) => removeModal(e)} data-testid='remove'>Удалить</button>
            <button onClick={(e) => closeModal(e)} data-testid='close'>Отмена</button>
          </div>
        </div>, 
        document.getElementsByTagName('body')[0]
      )}
    </>
  );
}

export default RemoveAgreePortal