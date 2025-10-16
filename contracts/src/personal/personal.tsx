import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import PersonalForm from './personalForm';
import { Personal } from '../helpers/contractTypes';
import {
  useDeletePersonalMutation,
  useGetPersonalsByOrgIdQuery,
} from '../redux/slices/personalRTKSlice';
import Loading from '../components/loading';
import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

const Personals = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [deletePersonal] = useDeletePersonalMutation();
  const {
      data: personals = [],
      isLoading,
      isFetching
    } = useGetPersonalsByOrgIdQuery(choosenOrg?.id ?? skipToken);

  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [changingPersonal, setChangingPersonal] = useState<Personal | undefined>();
  const page = (
    <>
      <h3>Personal ( {choosenOrg?.name} )</h3>
      <PersonalForm
        changingPersonal={changingPersonal}
        clearCallback={() => setChangingPersonal(undefined)}
      />

      {personals.length == 0 ? (
        <></>
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
                <button onClick={() => setChangingPersonal(person)}>Переименовать</button>
              </li>
            );
          })}
          <li>{isFetching && <Loading />}</li>
        </ul>
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
