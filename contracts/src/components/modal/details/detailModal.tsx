import { createPortal } from 'react-dom';
import style from './detailModal.module.css';
import { useEffect } from 'react';
import formStyle from 'assets/form.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getFullDesc } from '../../../redux/slices/servicesSlice';
type RemoveModalType = {
  close: () => void;
};

const DetailPortal = ({ close }: RemoveModalType) => {
  const fullDesc = useAppSelector(getFullDesc);
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    close();
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
            <div className={style.desc}>{fullDesc}</div>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default DetailPortal;
