import { useState } from 'react';
import { createPortal } from 'react-dom';
import style from './feedback.module.css';
import { addFeedback, fetchFeedback, removeFeedback, updateFeedback } from '../../../helpers/api';
import { FeedbackItem } from '../../../helpers/types';
import CloseBtn from '../../closeBtn';
import ModalContent from '../../modalContent';
import { SubmitHandler, useForm } from 'react-hook-form';

const Feedback = () => {
  const { register, watch, reset, setValue, handleSubmit } = useForm<FeedbackItem>();
  const newFeedback = watch(); // when pass nothing as argument, you are watching everything
  // const [_cookies, setCookie] = useCookies(['isAuth']);
  // const [errorMeaasge, setErrorMeaasge] = useState();

  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [deletedFeedbackId, setDeletedFeedbackId] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(true);
  const getFeedback = async () => {
    const feed = await fetchFeedback();
    setFeedback(feed);
  };
  const resetActiveFeedback = () => {
    [...document.getElementsByClassName(style.active)].forEach(n => (n as HTMLDivElement).classList.remove(style.active));
  }
  const onSubmit: SubmitHandler<FeedbackItem> = async (data) => {
    if (isNew) {
      const newFeedback = await addFeedback(data);
      setFeedback([...feedback, newFeedback]);
      reset();
      setIsNew(true);
    } else {
      const updateResult = await updateFeedback(data);
      if (updateResult)
        setFeedback(feedback.map((f) => (f.id == newFeedback.id ? newFeedback : f)));
      reset();
      setIsNew(true);
    }
    resetActiveFeedback();
  };
  return (
    <section className={style.feedback}>
      <h2 className={style.title}>Добавить отзыв</h2>
      <div className={style.newFeedbackContaier}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.formButtons}>
            <button
              className={style.clearBtn}
              onClick={() => {
                getFeedback();
              }}
            >
              Отобразить все
            </button>
            <button
              className={style.clearBtn}
              onClick={() => {
                setFeedback([]);
              }}
            >
              Скрыть
            </button>
          </div>
          <input id="inputId" className={style.idInput} {...register('id')} />
          <div className={style.inputField}>
            <label className={style.label} htmlFor="name">
              Автор
            </label>
            <input
              id="inputName"
              className={style.input}
              {...register('name', { required: true, maxLength: 10 })}
            />
          </div>
          <div className={`${style.inputField} ${style.textareaContainer}`}>
            <label className={style.label} htmlFor="text">
              Текст
            </label>
            <textarea
              id="inputText"
              className={`${style.input} ${style.textareaInput}`}
              {...register('text', { required: true })}
            />
          </div>
          <div className={style.formButtons}>
            <input
              className={style.submit}
              type="submit"
              value={isNew ? 'Добавить' : 'Сохранить'}
            />
            <button
              className={style.clearBtn}
              onClick={() => {
                resetActiveFeedback();
                setIsNew(true);
                reset();
              }}
            >
              Очистить
            </button>
          </div>
        </form>
        <div className={style.feedbackBlock}>
          <div>
            <img src="/quotes.svg" alt="quotes" className={`quotes ${style.feedbackQuotes}`} />
          </div>
          <p className={style.text}>{newFeedback?.text}</p>
          <p className={style.name}>{newFeedback?.name}</p>
        </div>
      </div>
      <div className={style.feedbackContainer}>
        {feedback.map((f) => (
          <div
            key={f.id}
            id={f.id.toString()}
            onClick={(el) => {
              resetActiveFeedback();
              (el.currentTarget as HTMLDivElement).classList.add(style.active);
              setValue('id', f.id);
              setValue('name', f.name);
              setValue('text', f.text);
              setIsNew(false);
            }}
            className={style.feedbackBlock}
          >
            <CloseBtn click={() => setDeletedFeedbackId(f.id)} />
            <div>
              <img src="/quotes.svg" alt="quotes" className={`quotes ${style.feedbackQuotes}`} />
            </div>
            <p className={style.text}>{f.text}</p>
            <p className={style.name}>{f.name}</p>
          </div>
        ))}
      </div>
      {deletedFeedbackId != null &&
        createPortal(
          <ModalContent
            content={
              <div className={style.modalContent}>
                <h3>Отзыв будет удален.</h3>
                <div className={style.modalButtons}>
                  <button
                    className={style.modalButton}
                    onClick={async () => {
                      const result = await removeFeedback({ id: deletedFeedbackId });
                      if (result.isRemove)
                        setFeedback(feedback.filter((f) => f.id != deletedFeedbackId));
                      setDeletedFeedbackId(null);
                    }}
                  >
                    Удалить
                  </button>
                  <button className={style.modalButton} onClick={() => setDeletedFeedbackId(null)}>
                    Отмена
                  </button>
                </div>
              </div>
            }
            onClose={() => setDeletedFeedbackId(null)}
          />,
          document.getElementsByTagName('body')[0]
        )}
    </section>
  );
};

export default Feedback;
