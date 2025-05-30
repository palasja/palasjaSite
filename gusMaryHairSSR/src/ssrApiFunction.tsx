import { API } from './helpers/constants';
import { CostInfo, FeedbackItem } from './helpers/types';

const fetchGetOption = {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
};
export const fetchFeedback = async (): Promise<FeedbackItem[]> => {
  const response = await fetch(`${API}/feedback`, fetchGetOption);
  const data = (await response.json()) as FeedbackItem[];

  return data;
};

export const fetchServices = async (): Promise<CostInfo[]> => {
  const response = await fetch(`${API}/services`, fetchGetOption);
  const data = (await response.json()) as CostInfo[];
  return data;
};
