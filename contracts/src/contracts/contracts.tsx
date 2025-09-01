import { useState } from 'react';
import style from './contracts.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import ContractForm from './contractsForm';
import { getChoosenMonth } from '../redux/slices/servicesSlice';
import {
  useGetContractsByOrgQuery,
  useAddContractMutation,
  useDeleteContractMutation,
  useUpdateContractMutation,
  useLazyGetContractsScanQuery,
} from '../redux/slices/contractRTKSlice';
import { Contract } from '../helpers/contractTypes';
import Loading from '../components/loading';
import { getURLByBase64File } from '../helpers/helper';

function Contracts() {
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const [delContract, { isLoading: isDeleteLoading }] = useDeleteContractMutation();
  const [getContractScan, { data: scanStr }] = useLazyGetContractsScanQuery();
  let contracts: Contract[] = [];
  let isGetLoading = false;
  if (choosenOrg) {
    const {
      data: con = [],
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetContractsByOrgQuery(choosenOrg.id);
    contracts = con;
    isGetLoading = isLoading;
  }
  const [_, { isLoading: isUpdateLoading }] = useUpdateContractMutation();
  const [__, { isLoading: isAddLoading }] = useAddContractMutation();
  const [changingContract, setChangingContract] = useState<Contract | undefined>();

  const page = (
    <>
      <h3>Договора</h3>
      <ContractForm changingContract={changingContract} />

      {contracts.length == 0 ? (
        <></>
      ) : (
        <ul>
          {contracts?.map((con, i) => {
            return (
              <li key={i}>
                {con.number}
                <button
                  onClick={async () => {
                    const fileName = `${choosenOrg?.name}_${choosenMonth}`;
                    const result = await getContractScan({ orgId: con.id }).unwrap();
                    const url = getURLByBase64File(result.scan, 'application/pdf');
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    link.click();
                    // Cleanup
                    URL.revokeObjectURL(url);
                  }}
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
                <button onClick={() => setChangingContract(con)}>Переименовать</button>
              </li>
            );
          })}
        </ul>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => delContract(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
  return isGetLoading || isUpdateLoading || isAddLoading || isDeleteLoading ? <Loading /> : page;
}

export default Contracts;
