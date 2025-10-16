import { SubmitHandler, useForm } from 'react-hook-form';
import { Organization as Org } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import {
  useAddOrganizationMutation,
  useUpdateOrganizationMutation,
} from '../redux/slices/organizationRTKSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changingOrg, getChangingOrganization } from '../redux/slices/orgsSlice';

const OrganizationForm = () => {
  const dispatch = useAppDispatch();
  const org = useAppSelector(getChangingOrganization);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Org>();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const [addOrganisation] = useAddOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();

  const resetForm = () => {
    setIsUpdate(false);
    reset();
    dispatch(changingOrg(null));
  };
  const onSubmitCreate: SubmitHandler<Org> = async (data) => {
    data = trimObjectProperty(data);
    try {
      await addOrganisation(data).unwrap();
      resetForm();
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  const onSubmitUpdate: SubmitHandler<Org> = async (data) => {
    data = trimObjectProperty(data);
    try {
      await updateOrganization(data).unwrap();
      resetForm();
    } catch (err) {
      console.error('Failed to save the post: ', err);
    }
  };
  useEffect(() => {
    if (org) {
      setIsUpdate(true);
      setValue('id', org?.id);
      setValue('name', org?.name);
    } else {
      resetForm();
    }
  }, [org]);
  return (
    <>
      {errors.name && <p>{errors.name.message}</p>}
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        {isUpdate ? (
          <input id="id" type="hidden" {...register('id', { required: true })} data-testid="id" />
        ) : (
          <></>
        )}
        <div>
          <label htmlFor="name">Наименование Организации</label>
          <input
            data-testid="name"
            id="name"
            {...register('name', {
              required: { value: true, message: 'Наименование должно быть заполнено' },
            })}
          />
        </div>

        <input type="submit" value={btnValue} data-testid="submit" />
      </form>
      <button onClick={() => resetForm()} >
        Очистить
      </button>
    </>
  );
};

export default OrganizationForm;
