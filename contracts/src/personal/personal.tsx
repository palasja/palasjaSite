import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import {
  changingPersonal,
  delPerson,
  fetchPersonalsByOrgId,
  getAllPersonals,
} from '../redux/slices/personalsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import PersonalForm from './personalForm';

const Personals = () => {
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const personals = useAppSelector(getAllPersonals);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();

  useEffect(() => {
    choosenOrg && dispatch(fetchPersonalsByOrgId(choosenOrg.id));
  }, [choosenOrg]);

  return (
    <>
      <h3>Personal</h3>
      <PersonalForm />

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
                <button onClick={() => dispatch(changingPersonal(person))}>Переименовать</button>
              </li>
            );
          })}
        </ul>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => dispatch(delPerson(removeId))}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
};

export default Personals;
