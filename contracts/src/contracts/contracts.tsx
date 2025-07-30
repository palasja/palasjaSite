import { useEffect } from 'react';
import { fetchContractsScan } from '../helpers/api';
import style from './contracts.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  changingContract,
  delContract,
  fetchContractsByOrgId,
  getAllContracts,
} from '../redux/slices/contractSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import ContractForm from './contractsForm';
import { getChoosenMonth } from '../redux/slices/servicesSlice';

function Contracts() {
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const dispatch = useAppDispatch();
  const contracts = useAppSelector(getAllContracts);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);

  useEffect(() => {
    choosenOrg && dispatch(fetchContractsByOrgId(choosenOrg.id));
  }, [choosenOrg]);
  return (
    <>
      <h3>Договора</h3>
      <ContractForm />

      {contracts.length == 0 ? (
        <></>
      ) : (
        <ul>
          {contracts?.map((con, i) => {
            return (
              <li key={i}>
                {con.number}
                <button
                  onClick={() => fetchContractsScan(con.id, `${choosenOrg?.name}_${choosenMonth}`)}
                >
                  Scan
                </button>
                <button
                  onClick={() => {
                    setRemoveId(con.id);
                    setIsShowRemoveModal(true);
                  }}
                >
                  Удалить
                </button>
                <button onClick={() => dispatch(changingContract(con))}>Переименовать</button>
              </li>
            );
          })}
        </ul>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => dispatch(delContract(removeId))}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
}

export default Contracts;
