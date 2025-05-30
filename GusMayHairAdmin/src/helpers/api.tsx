import { API } from './constants';
import { AppointmentItem, CostInfo, CostUpdateItem, FeedbackItem } from './types';

const fetchGetOption = {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
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

export const fetchTimeByMonth = (date: string): Promise<{ date: string }[]> => {
  return fetch(`${API}/workDateByMonth/${date}`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить время. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchAddTime = (
  date: string,
  time: string
): Promise<AppointmentItem & { newDate: boolean }> => {
  return fetch(`${API}/addDate/${date}.${time}`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Время не добавлено. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchRemoveTime = (date: string, timeId: string): Promise<{ removeDate: boolean }> => {
  return fetch(`${API}/removeTime/${date}.${timeId}`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Время не удалено. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchAvailableDate = (): Promise<{ date: string }[]> => {
  return fetch(`${API}/workdate`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Доступные даты не загружены. ErrorCode = ${res.status}`);
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

export const removeFeedback = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`${API}/removeFeedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const addFeedback = (newFeedback: FeedbackItem): Promise<FeedbackItem> => {
  return fetch(`${API}/addFeedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newFeedback: newFeedback }),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const updateFeedback = (newFeedback: FeedbackItem): Promise<FeedbackItem> => {
  return fetch(`${API}/updateFeedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newFeedback: newFeedback }),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchServiceCost = (): Promise<CostInfo[]> => {
  return fetch(`${API}/servicesCost`, fetchGetOption)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить стоимость услуг. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const updateServiceDescCost = (newCosts: CostUpdateItem[]): Promise<void> => {
  return fetch(`${API}/updateServiceDescCost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ serviceDesc: newCosts }),
  }).then((res) => {
    if (res.status != 200)
      throw new Error(`Не удалось обновить стоимость. ErrorCode = ${res.status}`);
  });
};

export const updateServiceCost = (services: CostUpdateItem[]): Promise<void> => {
  return fetch(`${API}/updateServiceCost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ services: services }),
  }).then((res) => {
    if (res.status != 200)
      throw new Error(`Не удалось обновить стоимость. ErrorCode = ${res.status}`);
  });
};
