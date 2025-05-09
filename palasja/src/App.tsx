import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Organization } from './types';
import Contracts from './Contracts';
import Personals from './Personal';
import Services from './services';


 const fetchOrganization = (): Promise<Organization[]> => {
  return fetch(`http://127.0.0.1:3000/getOrganizations`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
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
export const removeOrg = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removeOrganization`, {
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
  const onSubmit: SubmitHandler<Organization> = (data) => {
    fetch(`http://127.0.0.1:3000/addOrganization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organization: data }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
  };

function App() {
  const { register, handleSubmit } = useForm<Organization>();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [org, setOrg] = useState<Organization>();

  useEffect(() => {
      const getOrganization = () => {
        fetchOrganization().then((orgs) => setOrganizations(orgs));
      };
      getOrganization();
  }, []);
  // useEffect(() => {
  //     const getContracts = () => {
  //       fetchContracts(org.id).then((contracts) => setConstracts(contracts));
  //     };
  //     getContracts();
  // }, [org] );
  return (
    <>
      <h2>Organization</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div >
            <label htmlFor="name">
              Organization Name
            </label>
            <input
              {...register('name', { required: true, maxLength: 10 })}
            />
          </div>
          
          <input type="submit" value="Create" />
        </form>
      <ul>
        {organizations.length == 0 ? '': 
        organizations.map((org, i) => {
          return <li key={i}><span onClick={() => setOrg(org)}>{org.name}</span>
                            <button
                    onClick={async () => {
                      await removeOrg({ id: Number(org.id) });
                    }}
                  >
                    Удалить
                  </button>
          </li>
        })}
      </ul>
      {
        org == null ? '' : <Contracts orgId={org.id}/>
      }
      {
        org == null ? '' : <Personals orgId={org.id}/>
      }
      {
        org == null ? '' : <Services orgId={org.id}/>
      }
    </>
  )
}

export default App
