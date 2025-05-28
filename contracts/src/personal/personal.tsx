import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { addPerson, fetchPersonalsByOrgId, removePerson, updatePerson } from '../helpers/api';
import style from './personal.module.css';

const onSubmitCreate: SubmitHandler<Personal> = (data) => {
  addPerson(data);
};
const onSubmitUpdate: SubmitHandler<Personal> = (data) => {
  updatePerson(data);
};
type contractProps = {
  orgId: string;
};
const Personals = ({ orgId }: contractProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<Personal>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [personals, setPersonals] = useState<Personal[]>([]);
  useEffect(() => {
    const getPersonals = () => {
      fetchPersonalsByOrgId(orgId).then((orgs) => setPersonals(orgs));
    };
    getPersonals();
  }, [orgId]);

  return (
    <>
      <h3>Personal</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <input value={orgId} type="hidden" {...register('orgId', { required: true })} />
        <div>
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
          <label htmlFor="firstNameR">FirstNameR</label>
          <input {...register('firstNameR')} />
        </div>
        <div>
          <label htmlFor="middleNameR">MiddleNameR</label>
          <input {...register('middleNameR')} />
        </div>
        <div>
          <label htmlFor="lastNameR">LastNameR</label>
          <input {...register('lastNameR')} />
        </div>
        
        <div>
          <label htmlFor="positionName">Position Name</label>
          <input {...register('positionName')} />
        </div>
        <div>
          <label htmlFor="isHead">Sign</label>
          <input  type={"checkbox"} {...register('isHead', )} />
        </div>
        <input type="submit" value={isUpdate ? 'Update' : 'Create'} />
      </form>
      <button
        onClick={() => {
          setIsUpdate(false);
          reset()
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
                  {`${person.firstName} ${person.middleName} ${person.lastName} - ${person.positionName}`}
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
                      setValue('firstNameR', person.firstName);
                      setValue('middleNameR', person.middleName);
                      setValue('lastNameR', person.lastName);
                      setValue('isHead', person.isHead);
                      setValue('positionName', person.positionName);
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
