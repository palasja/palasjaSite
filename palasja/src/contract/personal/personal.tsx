import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { addPerson, fetchPersonalsByOrgId, updatePerson } from '../helpers/api';
import style from './personal.module.css';

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
const onSubmitCreate: SubmitHandler<Personal> = (data) => {
  addPerson(data);
};
const onSubmitUpdate: SubmitHandler<Personal> = (data) => {
  updatePerson(data);
};
type contractProps = {
  orgId: string;
};
function Personals({ orgId }: contractProps) {
  const { register, handleSubmit, setValue } = useForm<Personal>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [personals, setPersonals] = useState<Personal[]>([]);
  useEffect(() => {
    const getPersonals = () => {
      fetchPersonalsByOrgId(orgId).then((orgs) => setPersonals(orgs));
    };
    getPersonals();
  }, []);

  return (
    <>
      <h3>Personal</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <div>
          <input value={orgId} type="hidden" {...register('orgId', { required: true })} />
          <label htmlFor="fisrtName">FirtName</label>
          <input {...register('firstName', { required: true, maxLength: 20 })} />
        </div>
        <div>
          <label htmlFor="middleName">MiddleName</label>
          <input {...register('middleName', { required: true })} />
        </div>
        <div>
          <label htmlFor="lastName">LastName</label>
          <input {...register('lastName', { required: true })} />
        </div>
        <div>
          <label htmlFor="head">Head</label>
          <input {...register('headPosition')} />
        </div>
        <div>
          <label htmlFor="sign">Sign</label>
          <input {...register('signPosition')} />
        </div>
        <input type="submit" value={isUpdate ? 'Update' : 'Create'} />
      </form>
      <button
        onClick={() => {
          setIsUpdate(false);
          setValue('id', '');
          setValue('firstName', '');
          setValue('middleName', '');
          setValue('lastName', '');
          setValue('headPosition', '');
          setValue('signPosition', '');
        }}
      >
        Очистить
      </button>
      <ul>
        {personals.length == 0
          ? ''
          : personals.map((person, i) => {
              return (
                <li key={i}>
                  {`${person.firstName} ${person.middleName} ${person.lastName} - ${person.headPosition.length == 0 ? '' : person.headPosition} ${person.signPosition.length == 0 ? '' : 'Responsible'}`}
                  <button
                    onClick={async () => {
                      await removePerson({ id: Number(person.id) });
                    }}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', person.id);
                      setValue('firstName', person.firstName);
                      setValue('middleName', person.middleName);
                      setValue('lastName', person.lastName);
                      setValue('headPosition', person.headPosition);
                      setValue('signPosition', person.signPosition);
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

export default Personals;
