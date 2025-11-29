import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { choseAct, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/slices/servicesRTKSlice';
import { getIsWithoutOrg } from '../redux/slices/servicesSlice';
import style from './services.module.css';
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
        className={style.form}
      >
        <p>
          <p className="error">{errors.name?.message}</p>
          <p className="error">{errors.date?.message}</p>
          <p className="error">{errors.user?.message}</p>
          <p className="error">{errors.cost?.message}</p>
          <p className="error">{errors.count?.message}</p>
        </p>
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
        <div className={style.fieldsContainer}>
          <div className={style.fieldContainer}>
            <label htmlFor="name">Услуга</label>
            <input
              placeholder="Чистка ПК"
              {...register('name', {
                required: { value: true, message: 'Имя услуги должно быть заполнено' },
              })}
            />
          </div>
          <div className={style.fieldContainer}>
            <label htmlFor="date">Дата</label>
            <input
              type="date"
              placeholder="mm/dd/2025"
              {...register('date', {
                required: { value: true, message: 'Дата оказаиня долна быть заполнена' },
              })}
            />
          </div>
          <div className={style.fieldContainer}>
            <label htmlFor="user">Пользоваль</label>
            <input
              placeholder="Субботин"
              {...register('user', {
                required: { value: true, message: 'Пользоваль долно быть заполнена' },
              })}
            />
          </div>
          <div className={style.fieldContainer}>
            <label htmlFor="place">Место</label>
            <input placeholder="ЖЭУ" {...register('place')} />
          </div>
          <div className={style.fieldContainer}>
            <label htmlFor="cost">Стоимость</label>
            <input
              type="number"
              placeholder="Стоимость за еденицу"
              {...register('cost', {
                min: { value: 1, message: 'Стоимость должна быть больше 0' },
              })}
            />
          </div>
          <div className={style.fieldContainer}>
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

        <div className={style.comentContainer}>
          <label htmlFor="description">Описание</label>
          <textarea
            placeholder="Позвонили. Пришёл. Почистил."
            {...register('description')}
            className={style.comment}
          />
        </div>
        <div className={style.buttons}>
          <input type="submit" value={btnValue} />
          <input type="button" onClick={() => resetForm()} value="Очистить" />
        </div>
      </form>
    </>
  );
};

export default ServiceForm;
