import { createPortal } from 'react-dom';
import style from './removeModal.module.css';
import { useEffect } from 'react';
import formStyle from 'assets/form.module.css';
type RemoveModalType = {
  remove: () => void;
  close: () => void;
};

const RemoveAgreePortal = ({ remove, close }: RemoveModalType) => {
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    close();
  };
  const removeModal = (e: React.MouseEvent<HTMLElement>) => {
    remove();
  };
  useEffect(() => {
    document.getElementsByTagName('body')[0].classList.add(style.frozen);
    return () => document.getElementsByTagName('body')[0].classList.remove(style.frozen);
  }, []);
  return (
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => closeModal(e)} data-testid="removeModal">
          <div className={style.main}>
            <p>Вы действительно хотитет удалить</p>
            <form className={style.form}>
              <input
                onClick={(e) => removeModal(e)}
                data-testid="remove"
                value="Удалить"
                className={style.button}
              />
              <input
                onClick={(e) => closeModal(e)}
                data-testid="close"
                value="Отмена"
                className={style.button}
              />
            </form>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default RemoveAgreePortal;
