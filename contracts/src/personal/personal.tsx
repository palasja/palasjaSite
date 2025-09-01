import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import PersonalForm from './personalForm';
import { Personal } from '../helpers/contractTypes';
import {
  useAddPersonalMutation,
  useDeletePersonalMutation,
  useGetPersonalsByOrgIdQuery,
  useUpdatePersonalMutation,
} from '../redux/slices/personalRTKSlice';
import Loading from '../components/loading';
import { useState } from 'react';

const Personals = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [__, { isLoading: isAddLoading }] = useAddPersonalMutation();
  const [deletePersonal, { isLoading: isDeleteLoading }] = useDeletePersonalMutation();
  const [_, { isLoading: isUpdateLoading }] = useUpdatePersonalMutation();
  let personals: Personal[] = [];
  let isGetLoading = false;
  if (choosenOrg) {
    const {
      data: p = [],
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetPersonalsByOrgIdQuery(choosenOrg.id);
    personals = p;
    isGetLoading = isLoading;
  }

  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [changingPersonal, setChangingPersonal] = useState<Personal | undefined>();
  const page = (
    <>
      <h3>Personal</h3>
      <PersonalForm changingPersonal={changingPersonal} />

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
  return isGetLoading || isUpdateLoading || isAddLoading || isDeleteLoading ? <Loading /> : page;
};

export default Personals;
