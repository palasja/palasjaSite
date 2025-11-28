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
    useRemoveEntity<number>(-1);
  const [changingPersonal, setChangingPersonal] = useState<Personal | undefined>();

  const changeHandler = (person: Personal) => {
    setChangingPersonal(person);
    dispatch(choseAct('change'));
  };
  const addHandler = () => {
    dispatch(choseAct('add'));
  };
  const page = (
    <>
      <h3>
        Personal ( {choosenOrg?.name} ) <span onClick={() => addHandler()}>+</span>
      </h3>
      {action === 'change' && <PersonalForm changingPersonal={changingPersonal} />}
      {action === 'add' && <PersonalForm changingPersonal={undefined} />}
      {action === 'show' && (
        <>
          {personals.length == 0 ? (
            <> Нет сотрудников</>
          ) : (
            <ul>
              {personals.map((person, i) => {
                return (
                  <li key={person.id}>
                    {`${person.firstName} ${person.middleName} ${person.lastName} - ${person.positionName}`}
                    <button
                      onClick={() => {
                        setRemoveId(person.id);
                        setIsShowRemoveModal(true);
                      }}
                    >
                      Удалить
                    </button>
                    <button onClick={() => changeHandler(person)}>Изменить</button>
                  </li>
                );
              })}
              <li>{isFetching && <Loading />}</li>
            </ul>
          )}
        </>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deletePersonal(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
  return isLoading ? <Loading /> : page;
};

export default Personals;
