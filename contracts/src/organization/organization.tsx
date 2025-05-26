import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Organization as Org } from '../helpers/contractTypes';
import { addOrganisation, fetchAllOrganizations, removeOrg, updateOrganisation } from '../helpers/api';
import style from './organization.module.css';

const onSubmitCreate: SubmitHandler<Org> = (data) => {
  addOrganisation(data);
};
const onSubmitUpdate: SubmitHandler<Org> = (data) => {
  updateOrganisation(data);
};
type contractProps = {
  setOrgId: (id: string) => void;
};
const Organization = ({ setOrgId }: contractProps) => {
  const { register, handleSubmit, setValue } = useForm<Org>();
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const getOrganization = () => {
      fetchAllOrganizations().then((orgs) => {
        if (typeof orgs !== 'string') {
          setOrganizations(orgs as Org[]);
        }
      });
    };
    getOrganization();
  }, []);
  return (
    <>
      <h2>Organization</h2>

      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        {isUpdate ? <input id="id" type="hidden" {...register('id', { required: true })} /> : <></>}
        <div>
          <label htmlFor="name">Organization Name</label>
          <input id="name" {...register('name', { required: true })} />
        </div>

        <input type="submit" value={isUpdate ? 'Update' : 'Create'} />
      </form>
      <button
        onClick={() => {
          setIsUpdate(false);
          setValue('id', '');
          setValue('name', '');
        }}
      >
        Очистить
      </button>
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
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', org.id);
                      setValue('name', org.name);
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

export default Organization;
