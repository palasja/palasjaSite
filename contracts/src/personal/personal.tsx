import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { addPerson, fetchPersonalsByOrgId, removePerson, updatePerson } from '../helpers/api';
import style from './personal.module.css';
import { useIsUpdate } from '../hooks/useIsUpdate';

type contractProps = {
  orgId: string;
};
const Personals = ({ orgId }: contractProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Personal>();
  const {btnValue, isUpdate, setIsUpdate} = useIsUpdate();
  const [personals, setPersonals] = useState<Personal[]>([]);
  useEffect(() => {
    handlerPerson();
  }, [orgId]);
  const onSubmitCreate: SubmitHandler<Personal> = (data) => {
    addPerson(data).then(handlerPerson);
  };
  const onSubmitUpdate: SubmitHandler<Personal> = (data) => {
    updatePerson(data).then(handlerPerson);
    resetForm();
  };
  const handlerPerson = () => {
    fetchPersonalsByOrgId(orgId).then((orgs) => setPersonals(orgs));
  };
  const resetForm = () => {
    reset({
      orgId: orgId,
    });
  };
  return (
    <>
      <h3>Personal</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <input value={orgId} type="hidden" {...register('orgId', { required: true })} />
        <div>
          <label htmlFor="fisrtName">Имя</label>
          <input
            {...register('firstName', {
              required: { value: true, message: 'Имя долно быть заполнено' },
            })}
          />
        </div>
        <div>
          <label htmlFor="middleName">Отчество</label>
          <input
            {...register('middleName', {
              required: { value: true, message: 'Отчество подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Фамилия</label>
          <input
            {...register('lastName', {
              required: { value: true, message: 'Фамилия подписания долна быть заполнена' },
            })}
          />
        </div>

        <div>
          <label htmlFor="firstNameR">Имя в Родительном</label>
          <input {...register('firstNameR')} />
        </div>
        <div>
          <label htmlFor="middleNameR">Отчество в Родительном</label>
          <input {...register('middleNameR')} />
        </div>
        <div>
          <label htmlFor="lastNameR">Фамилия в Родительном</label>
          <input {...register('lastNameR')} />
        </div>

        <div>
          <label htmlFor="positionName">Должность</label>
          <input {...register('positionName')} />
        </div>
        <div>
          <label htmlFor="isHead">Руководитель организации</label>
          <input type={'checkbox'} {...register('isHead')} />
        </div>
        <input type="submit" value={btnValue} />
      </form>
      <button
        onClick={() => {
          resetForm();
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
                      await removePerson({ id: Number(person.id) }).then(handlerPerson);
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
};

export default Personals;
