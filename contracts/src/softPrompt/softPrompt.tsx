import { useEffect } from 'react';
import SoftPromptForm from './softPromptForm';
import { AddIcon } from '../components/icons/icons';
import style from './softPrompt.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import {
  changeSoft,
  getChangingSoft,
  changeActionSoft,
  getActionSoft,
} from '../redux/slices/softSlice';
import SoftInfoArticle from './softPrompt/softInfoArticle';
import SoftInfo from './softPrompt/softInfo';
import { useGetSoftInfoQuery } from '../redux/slices/softInfoRTK';

const SoftPrompt = () => {
  const { data: softinfoExample = [] } = useGetSoftInfoQuery();
  const softInfo = softinfoExample;

  const dispatch = useAppDispatch();
  const actionSoft = useAppSelector(getActionSoft);

  useEffect(() => {
    dispatch(changeActionSoft('show'));
  }, []);

  const changingSoft = useAppSelector(getChangingSoft);

  const clearHandler = () => {
    dispatch(changeSoft(undefined));
    dispatch(changeActionSoft('show'));
  };

  return (
    <>
      <div className={style.head}>
        <AddIcon
          onClick={() => {
            dispatch(changeActionSoft('new'));
          }}
        />
        <p>Информация по программам </p>
      </div>
      <main className={style.main}>
        <aside className={style.softMenu}>
          {softInfo.map((soft, i) => {
            return <SoftInfo soft={soft} key={i} />;
          })}
        </aside>
        <section>
          {actionSoft == 'show' && <SoftInfoArticle />}
          {actionSoft == 'change' && (
            <SoftPromptForm softInfo={changingSoft} clearCallback={() => clearHandler()} />
          )}
          {actionSoft == 'new' && (
            <SoftPromptForm softInfo={undefined} clearCallback={() => clearHandler()} />
          )}
        </section>
      </main>
    </>
  );
};

export default SoftPrompt;
