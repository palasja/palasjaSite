import { useState } from 'react';
import style from './adminDateTime.module.css';
import { AppointmentItem } from '../../../helpers/types';
import { fetchAddTime, fetchRemoveTime } from '../../../helpers/api';
import { sortTime } from '../../../helpers/functions';

const TimeEditor = (props: {
  times: AppointmentItem[];
  chosenDay: Date;
  availableDate: Date[];
  isMobile: boolean;
  setTimes: (times: AppointmentItem[]) => void;
  setAvailableDate: (dates: Date[]) => void;
}) => {
  const { times, chosenDay, availableDate, isMobile, setTimes, setAvailableDate } = props;
  const [chosenTimeId, setChosenTimeId] = useState<string>('');
  const [newTime, setNewTime] = useState<{ hour: string; minute: string }>({
    hour: '9',
    minute: '00',
  });

  const selectTime = (el: React.MouseEvent<HTMLLIElement, MouseEvent>, timeId: string) => {
    const a = el.target as HTMLElement;
    const b = [...(a.parentElement as HTMLElement).children] as HTMLElement[];
    b.forEach((e: HTMLElement) => e.classList.remove(style.timeItemActive));
    a.classList.add(style.timeItemActive);
    setChosenTimeId(timeId);
  };

  const addTime = async (date: string, time: string) => {
    const result = await fetchAddTime(date, time);
    if (result == undefined) return;
    setTimes(
      [...times, { id: result.id, time: `${newTime.hour}:${newTime.minute}` }].sort(sortTime)
    );
    if (result.newDate) setAvailableDate([...availableDate, new Date(date)]);
  };

  const removeTime = async (date: string, timeId: string) => {
    const removeResult = await fetchRemoveTime(date, timeId);
    if (removeResult == undefined) return;
    setTimes(times.filter((a) => a.id != timeId));
    if (removeResult.removeDate)
      setAvailableDate(availableDate.filter((d) => d.toLocaleDateString('en-CA') != date));
  };
  const START_HOUR = 9;
  const HOUR_COUNT = 12;
  const MINUTE_COUNT = 6;
  return (
    <>
      <h5 className={style.paramTitle}>Время</h5>
      <div className={style.time}>
        <div className={style.addTimeBlock}>
          <div className={style.timeBlock}>
            <fieldset className={style.timeField}>
              <legend className={style.timeLegend}>Часы</legend>
              <select
                className={`${style.hour} ${style.timeArrow}`}
                onChange={(e) => setNewTime({ hour: e.target.value, minute: newTime.minute })}
              >
                {[...Array(HOUR_COUNT)].map((_a, i) => (
                  <option key={i} value={i + START_HOUR}>
                    {i + START_HOUR}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className={style.timeField}>
              <legend className={style.timeLegend}>Минуты</legend>
              <select
                className={`${style.minute}  ${style.timeArrow}`}
                onChange={(e) => setNewTime({ hour: newTime.hour, minute: e.target.value })}
              >
                {[...Array(MINUTE_COUNT)].map((_a, i) => (
                  <option key={i} value={i == 0 ? '00' : i * 10}>
                    {i == 0 ? '00' : i * 10}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <button
            className={style.saveBtn}
            onClick={() => {
              addTime(chosenDay.toLocaleDateString('en-CA'), `${newTime.hour}:${newTime.minute}`) ==
                null;
            }}
          >
            ДОБАВИТЬ
          </button>
        </div>
        {(times.length > 0 || isMobile) && (
          <div className={style.chooseTimeBlockContainer}>
            <div className={style.chooseTimeBlock}>
              <h4 className={style.timeName}>Время</h4>
              <ul className={style.timeList}>
                {times &&
                  times.length !== 0 &&
                  times.map((t) => {
                    return (
                      <li
                        key={t.id}
                        className={style.timeItem}
                        onClick={(e) => selectTime(e, t.id)}
                      >
                        {t.time}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <button
              className={style.removeBtn}
              onClick={() => {
                if (chosenTimeId.length == 0) return;
                removeTime(chosenDay.toLocaleDateString('en-CA'), chosenTimeId);
              }}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TimeEditor;
