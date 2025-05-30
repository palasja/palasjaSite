import { useEffect, useState } from 'react';
import style from './appointment.module.css';
import './appointmentCalendar.css';
import Calendar, { CalendarProps } from 'react-calendar';
import { AppointmentItem } from '../../helpers/types';
import { MONTH_RU, RESPONSIVE } from '../../helpers/constants';
import { fetchTimeByMonth, fetchTimeByDate, fetchAvailableDate } from '../../helpers/api';

const SELECT_MONTH_COUNT = 3;

const onSelectTime = (el: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  const a = el.target as HTMLElement;
  const b = [...(a.parentElement as HTMLElement).children] as HTMLElement[];
  b.forEach((e: HTMLElement) => e.classList.remove(style.timeItemActive));
  a.classList.add(style.timeItemActive);
};

const monthOptionsForMobile = () => {
  const firstOption = (
    <option value="" key="-1">
      Месяц
    </option>
  );
  const curMonth = new Date().getMonth();
  const monthOptions = [...Array(SELECT_MONTH_COUNT)].map((_v, i) => (
    <option value={curMonth + i} key={i} className={style.monthOption}>
      {MONTH_RU[curMonth + i]}
      {/* {new Date(`${curMonth + i + 1}`).toLocaleString('default', { month: 'long' })} */}
    </option>
  ));
  return [firstOption, ...monthOptions];
};

const Appointment = (props: { onClose: () => void }) => {
  const [chosenDay, setChosenDay] = useState(new Date());
  const [times, setTimes] = useState<AppointmentItem[]>([]);
  const [availableDate, setAvailableDate] = useState<Date[]>([]);
  const [isMobile] = useState(document.body.clientWidth <= RESPONSIVE.mobile ? true : false);
  const [showDays, setShowDays] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      const getAppointment = () => {
        const today = new Date().toLocaleDateString('en-CA');
        fetchTimeByDate(today).then((times) => setTimes(times));
      };
      const getAvailableDate = () => {
        fetchAvailableDate().then((dates) => {
          setAvailableDate(dates.map((d) => new Date(d.date)));
        });
      };
      getAvailableDate();
      getAppointment();
    }
  }, []);

  const onChangeMonth = (value: string) => {
    if (value.length == 0) {
      setShowDays(false);
      return;
    }
    const selectedMonth = Number(value);
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
    const today = new Date();
    const day = today.getMonth() == selectedMonth ? today.getDate() : 1;
    const newDate = new Date(year, selectedMonth, day);

    fetchTimeByMonth(newDate.toLocaleDateString('en-CA')).then((dates) => {
      setAvailableDate(dates.map((d) => new Date(d.date)));
      setShowDays(true);
    });

    setChosenDay(newDate);
  };

  const onChangeDay = (value: string) => {
    if (value.length == 0) return;
    const newDate = new Date(chosenDay.getFullYear(), chosenDay.getMonth(), Number(value));
    setChosenDay(newDate);
    fetchTimeByDate(newDate.toLocaleDateString('en-CA')).then((times) => setTimes(times));
  };
  const dayOptionsForMobile = (): JSX.Element[] => {
    const firstOption = (
      <option value="" key="-1">
        Число
      </option>
    );
    let options: JSX.Element[] = [];
    if (showDays) {
      options = availableDate.map((fd, i) => (
        <option value={fd.getDate()} key={i} className={style.dayOption}>
          {fd.getDate()}
        </option>
      ));
    }
    return [firstOption, ...options];
  };

  const calendarOption: CalendarProps = {
    className: style.calendar,
    defaultValue: new Date(),
    onChange: (v) => {
      setChosenDay(v as Date);
      fetchTimeByDate((v as Date).toLocaleDateString('en-CA')).then((times) => setTimes(times));
    },
    value: chosenDay,
    locale: 'ru-RU',
    tileClassName: style.tile,
    prevLabel: <img src="/arrowDown.svg" alt="arrow" className={style.arrowPrev} />,
    nextLabel: <img src="/arrowDown.svg" alt="arrow" className={style.arrowNext} />,
    prev2Label: null,
    next2Label: null,
    showNeighboringMonth: false,
    tileDisabled: ({ date }) => {
      return date < new Date(Date.now() - 86400000) ||
        availableDate.find((d) => d.toDateString() === date.toDateString()) === undefined
        ? true
        : false;
    },
    formatShortWeekday: (_undefined, date: Date) =>
      date.toLocaleString('default', { weekday: 'short' }),
    formatMonthYear: (_locale, date: Date) => date.toLocaleString('default', { month: 'long' }),
  };

  return (
    <section className={style.appointment}>
      <div className={style.titleContainer}>
        <h3 className={style.title}>Записаться</h3>
        <div className={style.close} onClick={props.onClose} data-testid="close_modal"></div>
      </div>
      <div className={style.appointmentForm}>
        <div className={style.calendarBlock}>
          <p className={style.descAction}>
            <span className={style.titleNum}>1</span>
            <span className={style.paramTitle}>Выбери день</span>
          </p>
          {isMobile ? (
            <div className={style.mobileCalendar}>
              <select className={style.selectMonth} onChange={(e) => onChangeMonth(e.target.value)}>
                {monthOptionsForMobile()}
              </select>
              <select className={style.selectDay} onChange={(e) => onChangeDay(e.target.value)}>
                {dayOptionsForMobile()}
              </select>
            </div>
          ) : (
            <Calendar {...calendarOption} />
          )}
        </div>
        <div className={style.typeTime}>
          <div className={style.timeBlock}>
            <p className={style.descAction}>
              <span className={style.titleNum}>2</span>
              <span className={`${style.paramTitle} ${style.paramTitleTime}`}>Выбери время</span>
            </p>
            <div className={style.timeListContainer}>
              <p className={style.timeName}>Время</p>
              <ul className={style.timeList}>
                {times?.length !== 0 &&
                  times.map((t) => {
                    return (
                      <li
                        key={t.id}
                        className={style.timeItem}
                        onClick={isMobile ? undefined : (e) => onSelectTime(e)}
                      >
                        {t.time}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className={style.buttonBlock}>
            <p className={`${style.descAction} ${style.descActionCall}`}>
              <span className={`${style.titleNum} ${style.titleNumCall}`}>3</span>
              <span className={`${style.paramTitle} ${style.paramTitleCall}`}>
                Позвони для записи
              </span>
            </p>
            <a href="tel:+375298737951" className={style.appointmentBtn}>
              ПОЗВОНИТЬ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
