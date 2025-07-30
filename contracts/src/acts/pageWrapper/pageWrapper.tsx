import { Children, ReactNode } from 'react';
import style from './pageWrapper.module.css';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className={style.page} data-testid="page">
      <div className={style.print}>{children}</div>
    </div>
  );
};

export default PageWrapper;
