import style from './contracts.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chosenAction,
  getChosenchosenAction,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/remove/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import ContractForm from './contractsForm';
import {
  useGetContractsByOrgQuery,
  useDeleteContractMutation,
} from '../redux/slices/contractRTKSlice';
import { Contract } from '../helpers/contractTypes';
import Loading from '../components/loading';
import { skipToken } from '@reduxjs/toolkit/query';
import ContractTable from './contractTable';
import { AddIcon } from '../components/icons/icons';
import { useState } from 'react';

const Contracts = () => {
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const dispatch = useAppDispatch();
  const action = useAppSelector(getChosenchosenAction);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [delContract] = useDeleteContractMutation();
  const {
    data: contracts = [],
    isLoading,
    isFetching,
  } = useGetContractsByOrgQuery(choosenOrg?.id ?? skipToken);

  const [changingContract, setChangingContract] = useState<Contract | undefined>();
  const changeHandler = (con: Contract) => {
    setChangingContract(con);
    dispatch(chosenAction('change'));
  };
  const addHandler = () => {
    dispatch(chosenAction('add'));
  };
  const removeHandler = (id: string) => {
    setRemoveId(parseInt(id, 10));
    setIsShowRemoveModal(true);
  };
  const page = (
    <>
      <div className={style.nameContainer}>
        <AddIcon onClick={addHandler} testid="addContract" />
        <p>Договора ( {choosenOrg?.name} )</p>
      </div>

      {action === 'change' && <ContractForm changingContract={changingContract} />}
      {action === 'add' && <ContractForm changingContract={undefined} />}
      {action === 'show' && (
        <ContractTable data={contracts} edit={changeHandler} remove={removeHandler} />
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => delContract(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
  return isLoading ? <Loading /> : page;
};

export default Contracts;
