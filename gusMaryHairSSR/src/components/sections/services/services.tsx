import { createPortal } from 'react-dom';
import style from './services.module.css';
import { useState } from 'react';
import {
  PromptContent,
  DescItem,
  CostItem,
  Prompt as PromptType,
  CostInfo,
} from '../../../helpers/types';
import CloseBtn from '../../closeBtn';
import ModalContent from '../../modalContent';
import Appointment from '../../appointment';

export const getFreeItems: string[] = [
  'консультацию',
  'диагностику трихоскопом',
  'разбор вашего домашнего ухода',
  'памятка по уходу за волосами',
];

const getCostString = (costItem: CostItem | DescItem, showDelimiter?: boolean): string => {
  let res = '';
  if (costItem.cost) {
    res = `${costItem.cost} руб`;
  } else if (costItem.minCost && !costItem.maxCost) {
    res = `от ${costItem.minCost} руб`;
  } else {
    res = `${costItem.minCost} - ${costItem.maxCost} руб`;
  }
  return showDelimiter ? `- ${res}` : res;
};

const Prompt = ({ title, content, descComment }: PromptContent) => {
  return (
    <div className={style.prompt}>
      <CloseBtn />
      <h4 className={style.promptTitle}>{title}</h4>
      {typeof content === 'string' ? (
        <p className={style.promptText}>{content}</p>
      ) : (
        <ul className={style.promptList}>
          {content.map((c, i) => (
            <li key={i}>
              {c.name} {getCostString(c, true)}
            </li>
          ))}
        </ul>
      )}
      {descComment && <p className={style.promptComment}>{descComment}</p>}
    </div>
  );
};

const Services = (props: { services: CostInfo[] }) => {
  const { services } = props;
  const [showAppointment, setShowAppointment] = useState(false);
  const [prompt, setPrompt] = useState<PromptType | null>(null);

  return (
    <>
      <section id="services" className={style.service}>
        <h2 className={style.title}>Услуги</h2>
        <div className={style.serviceInfo}>
          <div className={style.mainService}>
            <h3 className={style.servicePartName}>Основные услуги*</h3>
            {services.map((info, i) => {
              return (
                <div key={i}>
                  {info.name ? <h5 className={style.proposTitle}>{info.name}</h5> : ''}
                  <ul className={style.costList}>
                    {info.services.map((s, i) => (
                      <li key={i} className={style.costListItem}>
                        <span
                          className={style.costListItemName}
                          onMouseLeave={() => setPrompt(null)}
                          onMouseEnter={(e) => {
                            setPrompt({
                              toElement: (e.target as HTMLElement).nextSibling as HTMLElement,
                              content: {
                                title: s.descTitle,
                                content: s.descContent ? s.descContent : s.serviceDesc,
                                descComment: s.descComment,
                              },
                            });
                          }}
                        >
                          {s.name}
                        </span>
                        <span className={style.costListItemLine}></span>{' '}
                        <span className={style.costListItemCost}>{getCostString(s)}</span>
                      </li>
                    ))}
                    {prompt != null &&
                      createPortal(<Prompt {...prompt.content} />, prompt.toElement)}
                  </ul>
                </div>
              );
            })}
            <p className={style.servicePrompt}>
              * Стоимость услуги зависит от длины и густоты волос
            </p>
          </div>
          <div className={style.specPropos}>
            <h3 className={style.servicePartName}>Специальное предложение:</h3>
            <h5 className={style.proposTitle}>Получаете бесплатно:</h5>
            <ul className={style.proposDetailList}>
              {getFreeItems.map((e, i) => (
                <li key={i} className={style.costDetailItem}>
                  {e}
                </li>
              ))}
            </ul>
            <h3 className={style.servicePartName}>Подарочный сертификат </h3>
            <p className={style.proposDetail}>
              Подарочный сертификат для ваших родных и близких на любую сумму
            </p>
            <button onClick={() => setShowAppointment(true)} className={style.appointment}>
              Записаться
            </button>
          </div>
        </div>
        {showAppointment &&
          createPortal(
            <ModalContent
              content={<Appointment onClose={() => setShowAppointment(false)} />}
              onClose={() => setShowAppointment(false)}
              bgColor="var(--color-black)"
              showCloseBtn={false}
            />,
            document.getElementsByTagName('body')[0]
          )}
      </section>
    </>
  );
};

export default Services;
