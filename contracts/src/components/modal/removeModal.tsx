import { createPortal } from 'react-dom';
import style from './removeModal.module.css';

type RemoveModalType = {
  remove: () => void
  hide: () => void
}

const RemoveAgreePortal = ({ remove, hide } : RemoveModalType) => {

  return(
    <>
      {createPortal(
        <div className={style.back} onClick={hide}>
          <div  className={style.main}>
            <p>Вы действительно хотитет удалить</p>
            <button onClick={remove}>Удалить</button>
            <button onClick={hide}>Отмена</button>
          </div>
        </div>, 
        document.getElementsByTagName('body')[0]
      )}
    </>
  );
}

export default RemoveAgreePortal