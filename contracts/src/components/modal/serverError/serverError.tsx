import { createPortal } from 'react-dom';
import style from './serverError.module.css';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getIsServerError, changeIsServerError } from '../../../redux/slices/errorSlice';
import { useEffect } from 'react';

const ServerErrorPortal = () => {
  const dispatch = useAppDispatch();
  const isServerError = useAppSelector(getIsServerError);
  useEffect(() => {
    document.getElementsByTagName('body')[0].classList.add(style.frozen);
    return () => document.getElementsByTagName('body')[0].classList.remove(style.frozen);
  }, []);
  return (
    <>
      {isServerError &&
        createPortal(
          <div
            className={style.back}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(changeIsServerError(false));
            }}
            data-testid="removeModal"
          >
            <h3 className={style.error}> Eturnal server Error</h3>
          </div>,
          document.getElementById('root') ?? document.getElementsByTagName('body')[0]
        )}
    </>
  );
};

export default ServerErrorPortal;
