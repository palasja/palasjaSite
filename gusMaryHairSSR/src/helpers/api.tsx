import { API } from './constants';
import { AppointmentItem, CostInfo, FeedbackItem } from './types';

type dateArray = {
  date: string;
}[];

const fetchGetOption = {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
};
export const fetchTimeByMonth = (date: string): Promise<dateArray> => {
  return fetch(`${API}/workDateByMonth/${date}`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить даты. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchTimeByDate = (day: string): Promise<AppointmentItem[]> => {
  return fetch(`${API}/worktime/${day}`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить время. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchAvailableDate = (): Promise<dateArray> => {
  return fetch(`${API}/workdate`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить даты. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchFeedback = (): Promise<FeedbackItem[]> => {
  return fetch(`${API}/feedback`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchServices = (): Promise<CostInfo[]> => {
  return fetch(`${API}/services`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
