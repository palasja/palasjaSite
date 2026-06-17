import { SubmitHandler, useForm } from 'react-hook-form';
import { Personal } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chosenAction, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import {
  useAddPersonalMutation,
  useUpdatePersonalMutation,
} from '../redux/slices/personalRTKSlice';
import formStyle from '../assets/form.module.css';

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
    console.log(data);
    data = trimObjectProperty(data);
    updatePersonal(data);
    resetForm();
  };
  const resetForm = () => {
    dispatch(chosenAction('show'));
  };
  useEffect(() => {
    if (changingPersonal) {
      setValue('firstname', changingPersonal.firstname);
      setValue('middlename', changingPersonal.middlename);
      setValue('lastname', changingPersonal.lastname);
      setValue('firstnameR', changingPersonal.firstnameR);
      setValue('middlenameR', changingPersonal.middlenameR);
      setValue('lastnameR', changingPersonal.lastnameR);
      setValue('isHead', changingPersonal.isHead);
      setValue('positionName', changingPersonal.positionName);
      setValue('id', changingPersonal.id);
    }
  }, []);
  return (
    <>
      <div className="error">
        {errors.lastname && <p>{errors.lastname.message}</p>}
        {errors.firstname && <p>{errors.firstname.message}</p>}
        {errors.middlename && <p>{errors.middlename.message}</p>}
        {errors.positionName && <p>{errors.positionName.message}</p>}
      </div>
      <form
        onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}
        className={formStyle.form}
      >
        <input value={choosenOrg?.id} type="hidden" {...register('orgId', { required: true })} />
        <div className={formStyle.fieldsContainer}>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="fisrtName">Имя</label>
            <input
              {...register('firstname', {
                required: { value: true, message: 'Имя долно быть заполнено' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="middlename">Отчество</label>
            <input
              {...register('middlename', {
                required: { value: true, message: 'Отчество долно быть заполнена' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="lastname">Фамилия</label>
            <input
              {...register('lastname', {
                required: { value: true, message: 'Фамилия долно быть заполнена' },
              })}
            />
          </div>

          <div className={formStyle.fieldContainer}>
            <label htmlFor="firstnameR">Имя в Родительном</label>
            <input {...register('firstnameR')} />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="middlenameR">Отчество в Родительном</label>
            <input {...register('middlenameR')} />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="lastnameR">Фамилия в Родительном</label>
            <input {...register('lastnameR')} />
          </div>

          <div className={formStyle.fieldContainer}>
            <label htmlFor="positionName">Должность</label>
            <input
              {...register('positionName', {
                required: { value: true, message: 'Позиция долна быть заполнена' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="isHead">Руководитель организации</label>
            <input type={'checkbox'} {...register('isHead')} />
          </div>
        </div>
        <div className={formStyle.buttons}>
          <input type="submit" value={btnValue} />
          <input type="button" onClick={() => resetForm()} value="Очистить" />
        </div>
      </form>
    </>
  );
};

export default PersonalForm;
