import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Contract } from './types';


export const removeContract = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removeContract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
  const onSubmit: SubmitHandler<Contract> = (data) => {
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
const fetchContracts = (orgId:  string): Promise<Contract[]> => {
  return fetch(`http://127.0.0.1:3000/getContractsByOrg/${orgId}`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  }
  }
).then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить список организаций. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
type contractProps = {
  orgId: string
}
function Contracts({orgId}: contractProps) {
  const { register, handleSubmit } = useForm<Contract>();
  // const [org, setOrg] = useState<Organization>();
  const [constracts, setConstracts] = useState<Contract[]>([]);
  useEffect(() => {
      const getContracts = () => {
        fetchContracts(orgId).then((orgs) => setConstracts(orgs));
      };
      getContracts();
  }, []);
  // useEffect(() => {
  //     const getContracts = () => {
  //       fetchContracts(org.id).then((contracts) => setConstracts(contracts));
  //     };
  //     getContracts();
  // }, [org] );
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
            <input
              {...register('number', { required: true, maxLength: 20 })}
            />
          </div>
          <div >
            <label htmlFor="signDate">
              SignDate
            </label>
            <input
              type='date'
              {...register('signDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="startDate">
              StartDate
            </label>
            <input
              type='date'
              {...register('startDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="endDate">
              EndDate
            </label>
            <input
              type='date'
              {...register('endDate', { required: true})}
            />
          </div>
          <input type="submit" value="Create Contract" />
        </form>
            <ul>
        {constracts.length == 0 ? '': 
        constracts.map((con, i) => {
          return <li key={i}>{con.number}
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
