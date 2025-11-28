import { useState } from 'react';
import { getChosenchosenAction } from '../redux/slices/orgsSlice';
import { useAppSelector } from '../redux/hooks';

export const useIsUpdate = () => {
  const action = useAppSelector(getChosenchosenAction);
  const [isUpdate, setIsUpdate] = useState(action === 'change');
  const btnValue = isUpdate ? 'Измениить' : 'Добавить';

  return { btnValue, isUpdate, setIsUpdate };
};
