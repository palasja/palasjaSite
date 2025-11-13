import { useEffect, useState } from 'react';
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
import { skipToken } from '@reduxjs/toolkit/query';

function Contracts() {
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const [delContract] = useDeleteContractMutation();
  const [getContractScan] = useLazyGetContractsScanQuery();
  const {
    data: contracts = [],
    isLoading,
    isFetching,
  } = useGetContractsByOrgQuery(choosenOrg?.id ?? skipToken);

  const [changingContract, setChangingContract] = useState<Contract | undefined>();
  useEffect(() => {
    setChangingContract(undefined);
  }, [choosenOrg]);
  const page = (
    <>
      <h3>Договора ( {choosenOrg?.name} )</h3>
      <ContractForm
        changingContract={changingContract}
        clearCallback={() => setChangingContract(undefined)}
      />

      {contracts.length == 0 ? (
        <></>
      ) : (
        <ul>
          {contracts?.map((con, i) => (
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
              <button onClick={() => setChangingContract(con)}>Изменить</button>
            </li>
          ))}
          <li>{isFetching && <Loading />}</li>
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
  return isLoading ? <Loading /> : page;
}

export default Contracts;
