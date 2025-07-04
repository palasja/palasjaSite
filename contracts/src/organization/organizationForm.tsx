import { SubmitHandler, useForm } from 'react-hook-form';
import { Organization as Org } from '../helpers/contractTypes';
import { addOrg, editOrg, getChangingOrganization } from '../redux/slices/orgsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';

const OrganizationForm = () => {
  const changingOrg = useAppSelector(getChangingOrganization);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Org>();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const dispatch = useAppDispatch();
  const resetForm = () => {
    setIsUpdate(false);
    reset();
  };
  const onSubmitCreate: SubmitHandler<Org> = (data) => {
    data = trimObjectProperty(data);
    dispatch(addOrg(data));
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Org> = (data) => {
    data = trimObjectProperty(data);
    dispatch(editOrg(data));
    resetForm();
  };
  useEffect(() => {
    if (changingOrg) {
      setIsUpdate(true);
      setValue('id', changingOrg?.id);
      setValue('name', changingOrg?.name);
    } else {
      resetForm();
    }
  }, [changingOrg]);
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
      <button
        onClick={() => {
          setIsUpdate(false);
          reset();
        }}
      >
        Очистить
      </button>
    </>
  );
};

export default OrganizationForm;
