import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Organization as Org } from './types';
import { fetchOrganization, removeOrg } from './api';

  const onSubmit: SubmitHandler<Org> = (data) => {
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
type contractProps = {
  setOrgId: (id: string) => void
}
function Organization({setOrgId} : contractProps) {
  const { register, handleSubmit } = useForm<Org>();
  const [organizations, setOrganizations] = useState<Org[]>([]);

  useEffect(() => {
      const getOrganization = () => {
        fetchOrganization().then((orgs) => setOrganizations(orgs));
      };
      getOrganization();
  }, []);
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
          return <li key={i}><span onClick={() => setOrgId(org.id)}>{org.name}</span>
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
    </>
  )
}

export default Organization
