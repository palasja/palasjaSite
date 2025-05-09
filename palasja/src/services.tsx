import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Service } from './types';



export const removePerson = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removeService`, {
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
  const onSubmit: SubmitHandler<Service> = (data) => {
    fetch(`http://127.0.0.1:3000/addService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ service: data }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
  };
const fetchServices = (orgId:  string): Promise<Service[]> => {
  return fetch(`http://127.0.0.1:3000/getServiceByOrgId/${orgId}`, {
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
function Services({orgId}: contractProps) {
  const { register, handleSubmit } = useForm<Service>();
  // const [org, setOrg] = useState<Organization>();
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
      const getPersonals = () => {
        fetchServices(orgId).then((orgs) => setServices(orgs));
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
      <h3>Services</h3>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div >
            <input value={orgId} type='hidden'
              {...register('orgId', { required: true})}
            />
            <label htmlFor="name">
              Name
            </label>
            <input
              {...register('name', { required: true })}
            />
          </div>
          <div >
            <label htmlFor="date">
              Date
            </label>
            <input
              type='date'
              {...register('date', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="user">
              User
            </label>
            <input
              {...register('user', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="place">
              Place
            </label>
            <input
              {...register('place')}
            />
          </div>
          <div >
            <label htmlFor="cost">
              Cost
            </label>
            <input
              type='number'
              {...register('cost')}
            />          </div>
            <div >
                          <label htmlFor="cost">
              Count
            </label>
                        <input
              type='number'
              defaultValue={1}
              {...register('count')}
            />
          </div>
          <input type="submit" value="Create Contract" />
        </form>
            <ul>
        {services.length == 0 ? '': 
        services.map((service, i) => {
          return <li key={i}>{`${service.name} ${service.date}`}
                            <button
                    onClick={async () => {
                      await removePerson({ id: Number(service.id) });
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

export default Services
