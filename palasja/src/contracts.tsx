import { useEffect, useState } from 'react';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Contract } from './types';
import { addContract, fetchContractsByOrgId, fetchContractsScan, removeContract, updateContract } from './api';
import { toBase64 } from './helper';
const onSubmitCreate: SubmitHandler<Contract> = async (data) => {
  //@ts-expect-error: Chome has faleArray instead of File
  data.scan = await toBase64(data.scan[0]);
  addContract(data);
};

const onSubmitUpdate: SubmitHandler<Contract> = async (data) => {
  
  if(data.scan.size == 0){
    //@ts-expect-error: Chome has faleArray instead of File
    delete data.scan;
  } else {
    //@ts-expect-error: Chome has faleArray instead of File
    data.scan = await toBase64(data.scan[0]);
  }
  updateContract(data);
};

type contractProps = {
  orgId: string;
};
function Contracts({ orgId }: contractProps) {
  const { register, handleSubmit, setValue } = useForm<Contract>();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const getContracts = () => {
      fetchContractsByOrgId(orgId).then((orgs) => setContracts(orgs));
    };
    getContracts();
  }, []);
  return (
    <>
      <h3>Contracts</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <div>
          <input
            value={orgId}
            type="hidden"
            {...register('orgId', { required: true, maxLength: 20 })}
          />
          <label htmlFor="number">Number</label>
          <input defaultValue={123} {...register('number', { required: true, maxLength: 20 })} />
        </div>
        <div>
          <label htmlFor="signDate">SignDate</label>
          <input
            defaultValue={'2025-05-05'}
            type="date"
            {...register('signDate', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="startDate">StartDate</label>
          <input
            defaultValue={'2025-05-05'}
            type="date"
            {...register('startDate', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="endDate">EndDate</label>
          <input
            defaultValue={'2025-05-05'}
            type="date"
            {...register('endDate', { required: true })}
          />
          <input type="file" {...register('scan')} />
        </div>
        <input type="submit" value={isUpdate ? 'Update' : 'Create'} />
              <button
        onClick={() => {
          setIsUpdate(false);
          setValue('id', '');
          setValue('number', '');
          setValue('signDate', new Date());
          setValue('startDate', new Date());
          setValue('endDate', new Date());
          setValue('scan', new File([], ''));
        }}
      >
        Очистить
      </button>
      </form>
      <ul>
        {contracts.length == 0
          ? ''
          : contracts.map((con, i) => {
              return (
                <li key={i}>
                  {con.number}
                  <button onClick={() => fetchContractsScan(con.id)}>Scan</button>
                  <button
                    onClick={async () => {
                      await removeContract({ id: Number(con.id) });
                    }}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', con.id);
                      setValue('number', con.number);
                      setValue('signDate', con.signDate);
                      setValue('startDate', con.startDate);
                      setValue('endDate', con.endDate);
                      setValue('scan', new File([], ''));
                    }}
                  >
                    Переименовать
                  </button>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default Contracts;
