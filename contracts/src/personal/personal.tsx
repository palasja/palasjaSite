import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  choseAct,
  getChosenchosenAction,
  getChosenInfo,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
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
    dispatch(choseAct('change'));
  };
  const addHandler = () => {
    dispatch(choseAct('add'));
  };
  const removeHandler = (id: string) => {
    setRemoveId(id);
    setIsShowRemoveModal(true);
  };
  const page = (
    <>
      <h3>
        Personal ( {choosenOrg?.name} ) <span onClick={() => addHandler()}>+</span>
      </h3>
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
