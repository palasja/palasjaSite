import style from './adminDateTime.module.css';
import './adminCalendar.css';
import { useEffect, useState } from 'react';
import { AppointmentItem } from '../../../helpers/types';
import { sortTime } from '../../../helpers/functions';
import AppointmentCalendar from './appointmentCalendar';
import AppointmentMobileCalendar from './appointmentMobileCalendar';
import TimeEditor from './timeEditor';
import { fetchAvailableDate, fetchTimeByDate } from '../../../helpers/api';

const RESPONSIVE = {
  mobile: 670,
};

const AdminDateTime = () => {
  const [times, setTimes] = useState<AppointmentItem[]>([]);
  const [availableDate, setAvailableDate] = useState<Date[]>([]);
  const [isMobile] = useState(
    document.body.clientWidth < RESPONSIVE.mobile ? true : false
  );
  const [chosenDay, setChosenDay] = useState(new Date());

  useEffect(() => {
    if (!isMobile) {
      const getAvailableDate = async () => {
        const result = await fetchAvailableDate();
        const date = result.map((d) => new Date(d.date));
        setAvailableDate(date);
        const todayStr = new Date().toLocaleDateString('en-CA');
        const isTodayHasTime = date.find((d) => d.toLocaleDateString('en-CA') == todayStr);

        if (isTodayHasTime) {
          const result = await fetchTimeByDate(todayStr);
          setTimes(result.sort(sortTime));
        }
      };

      getAvailableDate();
    }
  }, []);

  return (
    <section className={style.appoint}>
      <h3 className={style.appointTitle}>Внести изменения</h3>
      <div className={style.appointContainer}>
        {isMobile ? (
          <AppointmentMobileCalendar
            availableDate={availableDate}
            chosenDay={chosenDay}
            setChosenDay={setChosenDay}
            setTimes={setTimes}
            setAvailableDate={setAvailableDate}
          />
        ) : (
          <AppointmentCalendar
            availableDate={availableDate}
            chosenDay={chosenDay}
            setChosenDay={setChosenDay}
            setTimes={setTimes}
          />
        )}

        <div className={style.rightBlock}>
          <TimeEditor
            times={times}
            chosenDay={chosenDay}
            availableDate={availableDate}
            isMobile={isMobile}
            setTimes={setTimes}
            setAvailableDate={setAvailableDate}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDateTime;
