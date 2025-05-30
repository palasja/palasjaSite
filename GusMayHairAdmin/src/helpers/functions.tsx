import { fetchTimeByDate } from './api';
import { AppointmentItem } from './types';

export const togleStyle = (element: HTMLElement, style: string) => {
  const linkArray = [...(element.parentElement?.children as HTMLCollection)];
  linkArray.forEach((c) => c.classList.remove(style));
  element.classList.add(style);
};
export const getDateId = (date: Date): string => {
  const result = date.toLocaleDateString('ru-Ru', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return result.split('.').reverse().join('');
};

export const sortTime = (a: AppointmentItem, b: AppointmentItem) => {
  const hourA = a.time.split(':')[0];
  const hourB = b.time.split(':')[0];
  const minuteA = a.time.split(':')[1];
  const minuteB = b.time.split(':')[1];
  if (hourA > hourB) {
    return 1;
  } else if (hourA < hourB) {
    return -1;
  } else {
    if (minuteA > minuteB) {
      return 1;
    } else if (minuteA < minuteB) {
      return -1;
    } else {
      return 0;
    }
  }
};

export const getTimeByDate = async (
  availableDate: Date[],
  day: string
): Promise<AppointmentItem[]> => {
  if (availableDate.find((d) => d.toLocaleDateString('en-CA') == day) == undefined) return [];
  const times = await fetchTimeByDate(day);
  return times.sort(sortTime);
};
