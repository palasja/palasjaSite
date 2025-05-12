import { useEffect, useState } from 'react';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Organization as Org } from './types';
import { addOrganisation, fetchAllOrganizations, removeOrg } from './api';

const onSubmit: SubmitHandler<Org> = (data) => {
  addOrganisation(data);
};
type contractProps = {
  setOrgId: (id: string) => void;
};
function Organization({ setOrgId }: contractProps) {
  const { register, handleSubmit } = useForm<Org>();
  const [organizations, setOrganizations] = useState<Org[]>([]);

  useEffect(() => {
    const getOrganization = () => {
      fetchAllOrganizations().then((orgs) => setOrganizations(orgs));
    };
    getOrganization();
  }, []);
  return (
    <>
      <h2>Organization</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Organization Name</label>
          <input {...register('name', { required: true })} />
        </div>

        <input type="submit" value="Create" />
      </form>
      <ul>
        {organizations.length == 0
          ? ''
          : organizations.map((org, i) => {
              return (
                <li key={i}>
                  <span onClick={() => setOrgId(org.id)}>{org.name}</span>
                  <button
                    onClick={async () => {
                      await removeOrg({ id: Number(org.id) });
                    }}
                  >
                    Удалить
                  </button>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default Organization;
