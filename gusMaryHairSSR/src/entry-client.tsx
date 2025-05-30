import React from 'react';
import App from './App';
import { CostInfo, FeedbackItem } from './helpers/types';
import { hydrateRoot } from 'react-dom/client';

interface Window {
  __data__: { feedback: FeedbackItem[]; services: CostInfo[]; isMobile: boolean };
}
let data: { feedback: FeedbackItem[]; services: CostInfo[]; isMobile: boolean } = {
  feedback: [],
  services: [],
  isMobile: false,
};
if (typeof window !== 'undefined') {
  data = (window as unknown as Window).__data__;
}
// console.log(`qqq ${JSON.stringify(data)}`)
hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App {...data} />
  </React.StrictMode>
);
