import { useState } from 'react';
import { ContractScan } from '../helpers/contractTypes';

export const useRemoveEntity = <T extends string | number>(startValue: T) => {
  const [isShowRemoveModal, setIsShowRemoveModal] = useState(false);
  const [removeId, setRemoveId] = useState<T>(startValue);

  return { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId };
};
