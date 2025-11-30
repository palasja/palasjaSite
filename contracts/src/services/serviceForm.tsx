import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { choseAct, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/slices/servicesRTKSlice';
import { getIsWithoutOrg } from '../redux/slices/servicesSlice';
// import formStyle from './services.module.css';
import formStyle from 'assets/form.module.css';
type ChangingServiceFormProps = { changingService: Service | undefined };

const ServiceForm = ({ changingService }: ChangingServiceFormProps) => {
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
  const dispatch = useAppDispatch();
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
    dispatch(choseAct('show'));
  };
  useEffect(() => {
    if (changingService) {
      setValue('id', changingService.id);
      setValue('name', changingService.name);
      setValue('date', changingService.date);
      setValue('user', changingService.user);
      setValue('place', changingService.place);
      setValue('cost', changingService.cost);
      setValue('count', changingService.count);
      setValue('description', changingService.description);
    }
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}
        className={formStyle.form}
      >
        <div className="error">
          <p>{errors.name?.message}</p>
          <p>{errors.date?.message}</p>
          <p>{errors.user?.message}</p>
          <p>{errors.cost?.message}</p>
          <p>{errors.count?.message}</p>
        </div>
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
        <div className={formStyle.fieldsContainer}>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="name">Услуга</label>
            <input
              placeholder="Чистка ПК"
              {...register('name', {
                required: { value: true, message: 'Имя услуги должно быть заполнено' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="date">Дата</label>
            <input
              type="date"
              placeholder="mm/dd/2025"
              {...register('date', {
                required: { value: true, message: 'Дата оказаиня долна быть заполнена' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="user">Пользоваль</label>
            <input
              placeholder="Субботин"
              {...register('user', {
                required: { value: true, message: 'Пользоваль долно быть заполнена' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="place">Место</label>
            <input placeholder="ЖЭУ" {...register('place')} />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="cost">Стоимость</label>
            <input
              type="number"
              placeholder="Стоимость за еденицу"
              {...register('cost', {
                min: { value: 1, message: 'Стоимость должна быть больше 0' },
              })}
            />
          </div>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="count">Количество</label>
            <input
              type="number"
              defaultValue={1}
              placeholder="Количество"
              {...register('count', {
                min: { value: 1, message: 'Количество должна быть больше 0' },
              })}
            />
          </div>
        </div>

        <div className={formStyle.comentContainer}>
          <label htmlFor="description">Описание</label>
          <textarea
            placeholder="Позвонили. Пришёл. Почистил."
            {...register('description')}
            className={formStyle.comment}
          />
        </div>
        <div className={formStyle.buttons}>
          <input type="submit" value={btnValue} />
          <input type="button" onClick={() => resetForm()} value="Очистить" />
        </div>
      </form>
    </>
  );
};

export default ServiceForm;
