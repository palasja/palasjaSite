import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/slices/servicesRTKSlice';
import { getIsWithoutOrg } from '../redux/slices/servicesSlice';

type ChangingServiceFormProps = { changingService: Service | undefined; clearCallback: () => void };

const ServiceForm = ({ changingService, clearCallback }: ChangingServiceFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Service>();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const isWithoutOrg = useAppSelector(getIsWithoutOrg);
  const choosenOrg = isWithoutOrg ? undefined : useAppSelector(getChosenOrganization);
  const onSubmitCreate: SubmitHandler<Service> = (data) => {
    data = trimObjectProperty(data);
    data.ispaid = isWithoutOrg;
    addService(data);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Service> = (data) => {
    data = trimObjectProperty(data);
    updateService(data);
    resetForm();
  };

  const resetForm = () => {
    clearCallback();
    reset({ count: 1 });
    if (choosenOrg) setValue('orgId', choosenOrg.id.toString());
    setIsUpdate(false);
  };
  useEffect(() => {
    if (changingService) {
      setIsUpdate(true);
      setValue('id', changingService.id);
      setValue('name', changingService.name);
      setValue('date', changingService.date);
      setValue('user', changingService.user);
      setValue('place', changingService.place);
      setValue('cost', changingService.cost);
      setValue('count', changingService.count);
      setValue('description', changingService.description);
    } else {
      resetForm();
    }
  }, [changingService]);
  return (
    <>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <p>{errors.orgId?.message}</p>
        {/* No id field if wishout org */}
        {isWithoutOrg ? (
          <></>
        ) : (
          <input
            value={choosenOrg?.id}
            type="hidden"
            {...register('orgId', { required: { value: true, message: 'Не выбрана организация' } })}
          />
        )}
        <div>
          {errors.name && <p>{errors.name?.message}</p>}
          <label htmlFor="name">Услуга</label>
          <input
            {...register('name', {
              required: { value: true, message: 'Имя услуги должно быть заполнено' },
            })}
          />
        </div>
        <div>
          <p>{errors.date?.message}</p>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            {...register('date', {
              required: { value: true, message: 'Дата оказаиня долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <p>{errors.user?.message}</p>
          <label htmlFor="user">Пользоваль</label>
          <input
            {...register('user', {
              required: { value: true, message: 'Пользоваль долно быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="place">Место</label>
          <input {...register('place')} />
        </div>
        <div>
          <p>{errors.cost?.message}</p>
          <label htmlFor="cost">Стоимость</label>
          <input
            type="number"
            {...register('cost', {
              min: { value: 1, message: 'Стоимость должна быть больше 0' },
            })}
          />
        </div>
        <div>
          <p>{errors.count?.message}</p>
          <label htmlFor="count">Количество</label>
          <input
            type="number"
            defaultValue={1}
            {...register('count', {
              min: { value: 1, message: 'Количество должна быть больше 0' },
            })}
          />
        </div>
        <div>
          <label htmlFor="description">Комент</label>
          <textarea {...register('description')} />
        </div>
        <input type="submit" value={btnValue} />
        <input
          type="button"
          onClick={() => resetForm() }
          value="Очистить"
        />
      </form>
    </>
  );
};

export default ServiceForm;
