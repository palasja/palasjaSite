import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chosenAction,
  getChosenchosenAction,
  getChosenInfo,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/remove/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import PersonalForm from './personalForm';
import { Personal } from '../helpers/contractTypes';
import {
  useDeletePersonalMutation,
  useGetPersonalsByOrgIdQuery,
} from '../redux/slices/personalRTKSlice';
import Loading from '../components/loading';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import OrganizationForm from '../organization/organizationForm';
import PersonalTable from './personalTable';
import { AddIcon } from '../components/icons/icons';
import style from './personal.module.css';

const Personals = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [deletePersonal] = useDeletePersonalMutation();
  const dispatch = useAppDispatch();
  const action = useAppSelector(getChosenchosenAction);
  const {
    data: personals = [],
    isLoading,
    isFetching,
  } = useGetPersonalsByOrgIdQuery(choosenOrg?.id ?? skipToken);

  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<string>('');
  const [changingPersonal, setChangingPersonal] = useState<Personal | undefined>();

  const changeHandler = (person: Personal) => {
    console.log(person);
    setChangingPersonal(person);
    dispatch(chosenAction('change'));
  };
  const addHandler = () => {
    dispatch(chosenAction('add'));
  };
  const removeHandler = (id: string) => {
    setRemoveId(id);
    setIsShowRemoveModal(true);
  };
  const page = (
    <>
      <div className={style.nameContainer}>
        <AddIcon onClick={addHandler} />
        <p>Personal ( {choosenOrg?.name} )</p>
      </div>

      {action === 'change' && <PersonalForm changingPersonal={changingPersonal} />}
      {action === 'add' && <PersonalForm changingPersonal={undefined} />}
      {action === 'show' && (
        <PersonalTable data={personals} edit={changeHandler} remove={removeHandler} />
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deletePersonal(parseInt(removeId, 10))}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
  return isLoading ? <Loading /> : page;
};

export default Personals;
