import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Contract } from './types';
import { fetchContracts, fetchContractsScan, removeContract } from './api';

 const onSubmit: SubmitHandler<Contract> = async (data) => {
    //@ts-ignore
    data.scan = await toBase64(data.scan[0]);
    fetch(`http://127.0.0.1:3000/addContracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contract: data }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
  };


type contractProps = {
  orgId: string
}
function Contracts({orgId}: contractProps) {
  const { register, handleSubmit } = useForm<Contract>();
  const [contracts, setContracts] = useState<Contract[]>([]);
  useEffect(() => {
      const getContracts = () => {
        fetchContracts(orgId).then((orgs) => setContracts(orgs));
      };
      getContracts();
  }, []);
  return (
    <>
      <h3>Contracts</h3>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div >
            <input value={orgId} type='hidden'
              {...register('orgId', { required: true, maxLength: 20 })}
            />
            <label htmlFor="number">
              Number
            </label>
            <input defaultValue={123}
              {...register('number', { required: true, maxLength: 20 })}
            />
          </div>
          <div >
            <label htmlFor="signDate">
              SignDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('signDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="startDate">
              StartDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('startDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="endDate">
              EndDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('endDate', { required: true})}
            />
            <input
              type='file'
              {...register('scan')}
            />
          </div>
          <input type="submit" value="Create Contract" />
        </form>
            <ul>const fileURL = URL.createObjectURL(blob);
        {contracts.length == 0 ? '': 
        contracts.map((con, i) => {
          return <li key={i}>{con.number}
            <button onClick={() => fetchContractsScan(con.id)}>Scan</button>
                            <button
                    onClick={async () => {
                      await removeContract({ id: Number(con.id) });
                    }}
                  >
                    Удалить
                  </button>
          </li>
        })}
      </ul>
    </>
  )
}

export default Contracts
