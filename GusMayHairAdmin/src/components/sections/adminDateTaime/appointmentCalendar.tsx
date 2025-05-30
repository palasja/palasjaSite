import style from './adminDateTime.module.css';
import Calendar from 'react-calendar';
import { getTimeByDate } from '../../../helpers/functions';
import { AppointmentItem } from '../../../helpers/types';

const AppointmentCalendar = (props: {
  availableDate: Date[];
  chosenDay: Date;
  setChosenDay: (date: Date) => void;
  setTimes: (times: AppointmentItem[]) => void;
}) => {
  const { availableDate, chosenDay, setChosenDay, setTimes } = props;
  return (
    <div>
      <h5 className={style.paramTitle}>Месяц</h5>
      <Calendar
        className={style.calendar}
        defaultValue={new Date()}
        onChange={async (v) => {
          setChosenDay(v as Date);
          const strDay = (v as Date).toLocaleDateString('en-CA');
          const times = await getTimeByDate(availableDate, strDay);
          setTimes(times);
        }}
        value={chosenDay}
        locale="ru-RU"
        tileClassName={({ date }) =>
          availableDate.find((d) => d.toDateString() === date.toDateString()) === undefined
            ? style.tile
            : style.tileWithTime
        }
        prevLabel={<img src="/arrowDown.svg" alt="arrow" className={style.arrowPrev} />}
        nextLabel={<img src="/arrowDown.svg" alt="arrow" className={style.arrowNext} />}
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        tileDisabled={({ date }) => date < new Date(Date.now() - 86400000)}
        formatShortWeekday={(_undefined, date: Date) =>
          date.toLocaleString('default', { weekday: 'short' })
        }
        formatMonthYear={(_locale, date: Date) => date.toLocaleString('default', { month: 'long' })}
      />
    </div>
  );
};
export default AppointmentCalendar;
