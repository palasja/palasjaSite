import { useState } from 'react';
import style from './adminDateTime.module.css';
import { AppointmentItem } from '../../../helpers/types';
import { getTimeByDate } from '../../../helpers/functions';
import { fetchTimeByMonth } from '../../../helpers/api';

export const MONTH_RU = [
  'Январь',
  'Февральy',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const SELECT_MONTH_COUNT = 3;

const AppointmentMobileCalendar = (props: {
  availableDate: Date[];
  chosenDay: Date;
  setChosenDay: (date: Date) => void;
  setTimes: (times: AppointmentItem[]) => void;
  setAvailableDate: (dates: Date[]) => void;
}) => {
  const { availableDate, chosenDay, setChosenDay, setTimes, setAvailableDate } = props;
  const [showDays, setShowDays] = useState(false);

  const monthOptionsForMobile = () => {
    const firstOption = (
      <option value="" key="-1" className={style.optionName}>
        Месяц
      </option>
    );
    const curMonth = new Date().getMonth();
    const monthOptions = [...Array(SELECT_MONTH_COUNT)].map((_v, i) => (
      <option value={curMonth + i} key={i} className={style.monthOption}>
        {MONTH_RU[curMonth + i]}
      </option>
    ));
    return [firstOption, ...monthOptions];
  };
  const getTimeByMonth = async (date: string) => {
    const dates = await fetchTimeByMonth(date);
    setAvailableDate(dates.map((d) => new Date(d.date)));
    setShowDays(true);
  };

  const dayOptionsForMobile = (): JSX.Element[] => {
    const firstOption = (
      <option value="" key="-1" className={style.optionName}>
        Число
      </option>
    );
    let options: JSX.Element[] = [];
    if (showDays) {
      const dayInMonth = new Date(chosenDay.getFullYear(), chosenDay.getMonth() + 1, 0).getDate();
      options = [...Array(dayInMonth)].map((_d, i) => (
        <option
          value={i + 1}
          key={i}
          className={
            availableDate.find(
              (d) =>
                d.toLocaleDateString('en-CA') ==
                new Date(chosenDay.getFullYear(), chosenDay.getMonth(), i + 1).toLocaleDateString(
                  'en-CA'
                )
            ) == undefined
              ? style.dayOption
              : style.dayOptionWithTime
          }
        >
          {i + 1}
        </option>
      ));
    }
    return [firstOption, ...options];
  };

  return (
    <>
      <div>
        <h4 className={style.selectName}>Месяц</h4>
        <select
          className={style.selectMonth}
          onChange={(e) => {
            if (e.target.value.length == 0) {
              setShowDays(false);
              return;
            }

            const selectedMonth = Number(e.target.value);
            const choosenMonth = chosenDay.getMonth() + 1;
            const monthDifference = choosenMonth - selectedMonth;
            let year = 0;
            if (monthDifference > SELECT_MONTH_COUNT) {
              year = chosenDay.getFullYear() + 1;
            } else if (monthDifference < -SELECT_MONTH_COUNT) {
              year = chosenDay.getFullYear() - 1;
            } else {
              year = chosenDay.getFullYear();
            }
            selectedMonth > chosenDay.getMonth() + 1
              ? chosenDay.getFullYear()
              : chosenDay.getFullYear() + 1;
            const fullDate = new Date(year, selectedMonth);
            getTimeByMonth(fullDate.toLocaleDateString('en-CA'));
            setChosenDay(fullDate);
          }}
        >
          {monthOptionsForMobile()}
        </select>
      </div>
      <div>
        <h4 className={style.selectName}>Число</h4>
        <select
          className={style.selectDay}
          onChange={async (e) => {
            if (e.target.value.length == 0) return;
            const newDate = new Date(
              chosenDay.getFullYear(),
              chosenDay.getMonth(),
              Number(e.target.value)
            );
            availableDate.find(
              (d) => d.toLocaleDateString('en-CA') == newDate.toLocaleDateString('en-CA')
            )
              ? e.target.classList.add(style.dayOptionWithTime)
              : e.target.classList.remove(style.dayOptionWithTime);
            setChosenDay(
              new Date(chosenDay.getFullYear(), chosenDay.getMonth(), Number(e.target.value))
            );
            const times = await getTimeByDate(availableDate, newDate.toLocaleDateString('en-CA'));
            setTimes(times);
          }}
        >
          {dayOptionsForMobile()}
        </select>
      </div>
    </>
  );
};

export default AppointmentMobileCalendar;
