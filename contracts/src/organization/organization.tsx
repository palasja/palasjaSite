import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Organization as Org } from '../helpers/contractTypes';
import {
  addOrganisation,
  fetchAllOrganizations,
  removeOrg,
  updateOrganisation,
} from '../helpers/api';
import style from './organization.module.css';

type contractProps = {
  setOrgId: (id: string) => void;
};
const Organization = ({ setOrgId }: contractProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<Org>();
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [choosenOrg, setChoosenOrg] = useState('');

  const handlerOrganization = () => {
    fetchAllOrganizations().then((orgs) => {
      if (typeof orgs !== 'string') {
        setOrganizations(orgs as Org[]);
      }
    });
  };

  const onSubmitCreate: SubmitHandler<Org> = (data) => {
    addOrganisation(data).then(handlerOrganization);
    reset();
  };
  const onSubmitUpdate: SubmitHandler<Org> = (data) => {
    updateOrganisation(data);
    reset();
  };

  useEffect(() => {
    handlerOrganization();
  }, []);
  return (
    <>
      <h2>Организации</h2>

      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        {isUpdate ? <input id="id" type="hidden" {...register('id', { required: true })} /> : <></>}
        <div>
          <label htmlFor="name">Наименование Организации</label>
          <input id="name" {...register('name', { required: true })} />
        </div>

        <input type="submit" value={isUpdate ? 'Сохранить' : 'Создать'} />
      </form>
      <button
        onClick={() => {
          setIsUpdate(false);
          reset();
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
                  <span
                    onClick={() => {
                      setOrgId(org.id);
                      setChoosenOrg(org.name);
                    }}
                  >
                    {org.name}
                  </span>
                  <button
                    onClick={() => {
                      removeOrg({ id: Number(org.id) }).then(() => handlerOrganization());
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
      <h2>{choosenOrg.length == 0 ? '' : choosenOrg}</h2>
    </>
  );
};

export default Organization;
