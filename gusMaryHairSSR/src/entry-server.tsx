import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { CostInfo, FeedbackItem } from './helpers/types';

export function render(data: {
  feedback: FeedbackItem[];
  services: CostInfo[];
  isMobile: boolean;
}) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <App {...data} />
    </React.StrictMode>
  );
}
