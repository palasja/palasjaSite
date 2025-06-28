import { SubmitHandler, useForm } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { createPersonal, editPerson, getChangingPersonals } from '../redux/slices/personalsSlice';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';

const PersonalForm = () => {
  const dispatch = useAppDispatch();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const changingPersonal = useAppSelector(getChangingPersonals);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Personal>();

  const onSubmitCreate: SubmitHandler<Personal> = (data) => {
    dispatch(createPersonal(data));
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Personal> = (data) => {
    dispatch(editPerson(data));
    resetForm();
  };
  const resetForm = () => {
    setIsUpdate(false);
    reset({
      orgId: choosenOrg?.id.toString(),
    });
  };
  useEffect(() => {
    if (changingPersonal) {
      setIsUpdate(true);
      setValue('firstName', changingPersonal.firstName);
      setValue('middleName', changingPersonal.middleName);
      setValue('lastName', changingPersonal.lastName);
      setValue('firstNameR', changingPersonal.firstName);
      setValue('middleNameR', changingPersonal.middleName);
      setValue('lastNameR', changingPersonal.lastName);
      setValue('isHead', changingPersonal.isHead);
      setValue('positionName', changingPersonal.positionName);
      setValue('id', changingPersonal.id);
    } else {
      resetForm();
    }
  }, [changingPersonal]);
  return (
    <>
      {errors.lastName && <p>{errors.lastName.message}</p>}
      {errors.firstName && <p>{errors.firstName.message}</p>}
      {errors.middleName && <p>{errors.middleName.message}</p>}
      {errors.positionName && <p>{errors.positionName.message}</p>}
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <input value={choosenOrg?.id} type="hidden" {...register('orgId', { required: true })} />
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
              required: { value: true, message: 'Отчество долно быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Фамилия</label>
          <input
            {...register('lastName', {
              required: { value: true, message: 'Фамилия долно быть заполнена' },
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
          <input
            {...register('positionName', {
              required: { value: true, message: 'Позиция долна быть заполнена' },
            })}
          />
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
    </>
  );
};

export default PersonalForm;
