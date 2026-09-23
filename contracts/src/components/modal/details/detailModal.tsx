import { createPortal } from 'react-dom';
import style from './detailModal.module.css';
import { ReactNode, useEffect } from 'react';

type RemoveModalType = {
  children: ReactNode;
};

const DetailPortal = ({ children }: RemoveModalType) => {
  useEffect(() => {
    document.getElementsByTagName('body')[0].classList.add(style.frozen);
    return () => document.getElementsByTagName('body')[0].classList.remove(style.frozen);
  }, []);
  return (
    <>
      {createPortal(
        children,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default DetailPortal;
