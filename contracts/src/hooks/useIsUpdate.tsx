import { useState } from 'react';

export const useIsUpdate = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  let btnValue = isUpdate ? 'Измениить' : 'Добавить';

  return { btnValue, isUpdate, setIsUpdate };
};
