import { SubmitHandler, useForm } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { choseAct, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import {
  useAddPersonalMutation,
  useUpdatePersonalMutation,
} from '../redux/slices/personalRTKSlice';

type ChangingPersonalFormProps = {
  changingPersonal: Personal | undefined;
};

const PersonalForm = ({ changingPersonal = undefined }: ChangingPersonalFormProps) => {
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Personal>();
  const [addPersonal] = useAddPersonalMutation();
  const [updatePersonal] = useUpdatePersonalMutation();

  const onSubmitCreate: SubmitHandler<Personal> = (data) => {
    data = trimObjectProperty(data);
    addPersonal(data);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Personal> = (data) => {
    data = trimObjectProperty(data);
    updatePersonal(data);
    resetForm();
  };
  const resetForm = () => {
    dispatch(choseAct('show'));
  };
  useEffect(() => {
    if (changingPersonal) {
      setValue('firstName', changingPersonal.firstName);
      setValue('middleName', changingPersonal.middleName);
      setValue('lastName', changingPersonal.lastName);
      setValue('firstNameR', changingPersonal.firstNameR);
      setValue('middleNameR', changingPersonal.middleNameR);
      setValue('lastNameR', changingPersonal.lastNameR);
      setValue('isHead', changingPersonal.isHead);
      setValue('positionName', changingPersonal.positionName);
      setValue('id', changingPersonal.id);
    }
  }, []);
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
