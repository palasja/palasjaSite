import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Personal } from './types';



export const removePerson = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removePersonal`, {
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
  const onSubmit: SubmitHandler<Personal> = (data) => {
    fetch(`http://127.0.0.1:3000/addPersonal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ personal: data }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
  };
const fetchPersonals = (orgId:  string): Promise<Personal[]> => {
  return fetch(`http://127.0.0.1:3000/getPersonalByOrgId/${orgId}`, {
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
function Personals({orgId}: contractProps) {
  const { register, handleSubmit } = useForm<Personal>();
  // const [org, setOrg] = useState<Organization>();
  const [personals, setPersonals] = useState<Personal[]>([]);
  useEffect(() => {
      const getPersonals = () => {
        fetchPersonals(orgId).then((orgs) => setPersonals(orgs));
      };
      getPersonals();
  }, []);
  // useEffect(() => {
  //     const getContracts = () => {
  //       fetchContracts(org.id).then((contracts) => setConstracts(contracts));
  //     };
  //     getContracts();
  // }, [org] );
  return (
    <>
      <h3>Personal</h3>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div >
            <input value={orgId} type='hidden'
              {...register('orgId', { required: true})}
            />
            <label htmlFor="fisrtName">
              FirtName
            </label>
            <input
              {...register('firstName', { required: true, maxLength: 20 })}
            />
          </div>
          <div >
            <label htmlFor="middleName">
              MiddleName
            </label>
            <input
              {...register('middleName', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="lastName">
              LastName
            </label>
            <input
              {...register('lastName', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="head">
              Head
            </label>
            <input
              type="checkbox"
              {...register('head')}
            />
          </div>
          <div >
            <label htmlFor="sign">
              Sign
            </label>
            <input
              type="checkbox"
              {...register('sign')}
            />
          </div>
          <input type="submit" value="Create Contract" />
        </form>
            <ul>
        {personals.length == 0 ? '': 
        personals.map((person, i) => {
          return <li key={i}>{`${person.firstName} ${person.middleName} ${person.lastName} - ${person.head ? 'Disector': ''} ${person.sign ? 'Responsible': ''}`}
                            <button
                    onClick={async () => {
                      await removePerson({ id: Number(person.id) });
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

export default Personals
