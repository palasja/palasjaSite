import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chosenAction, getChosenOrganization } from '../redux/slices/orgsSlice';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/slices/servicesRTKSlice';
import formStyle from '../assets/form.module.css';
import { useLazyGetPersonalsByOrgIdQuery } from '../redux/slices/personalRTKSlice';
import { useLazyGetPriceQuery } from '../redux/slices/priceRTKSlice';
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
  const [loadPersonal, { data: personal }] = useLazyGetPersonalsByOrgIdQuery();
  const [loadPriceList, { data: priceList }] = useLazyGetPriceQuery();
  const [isUserFromList, setIsUserFromlist] = useState(false);
  const [isServiseFromPriceList, setServiseFromPriceList] = useState(false);
  const choosenOrg = useAppSelector(getChosenOrganization);
  
  const onSubmitCreate: SubmitHandler<Service> = (data) => {
    data = trimObjectProperty(data);
    data.ispaid = false;
    addService(data);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Service> = (data) => {
    data = trimObjectProperty(data);
    updateService(data);
    resetForm();
  };
  const setCostFromPriceList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const price = priceList?.find((p) => p.serviceName === e.target.value);
    if (price) setValue('cost', price.cost);
  };
  const resetForm = () => {
    dispatch(chosenAction('show'));
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
      setValue('time', changingService.time);
      setValue('description', changingService.description);
      setValue('ispaid', changingService.ispaid);
    }
  }, []);
  useEffect(() => {
    if (isUserFromList && choosenOrg !== undefined && choosenOrg !== null) {
      loadPersonal(choosenOrg.id, true);
    }
  }, [isUserFromList]);

  useEffect(() => {
    if (isServiseFromPriceList) {
      loadPriceList();
    }
  }, [isServiseFromPriceList]);
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
        <input
          value={choosenOrg?.id}
          type="hidden"
          {...register('orgId', {
               
                valueAsNumber: true,
              })}
        />
        <input
          type="hidden"
          {...register('ispaid')}
        />
        <div className={formStyle.fieldsContainer}>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="user">Услуга</label>
            <input
              className={formStyle.userListCheckbox}
              type="checkbox"
              name="paid"
              defaultChecked={isServiseFromPriceList}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setServiseFromPriceList(e.target.checked)
              }
            />
            {isServiseFromPriceList ? (
              <select {...register('name', { onChange: setCostFromPriceList })}>
                {priceList?.map((p) => (
                  <option key={p.id} value={p.serviceName}>
                    {p.serviceName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                placeholder="Чистка ПК"
                {...register('name', {
                  required: { value: true, message: 'Имя услуги должно быть заполнено' },
                })}
              />
            )}
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
              className={formStyle.userListCheckbox}
              type="checkbox"
              name="paid"
              defaultChecked={isUserFromList}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIsUserFromlist(e.target.checked)}
            />
            {isUserFromList ? (
              <select {...register('user')}>
                {personal?.map((p) => (
                  <option key={p.id} value={p.positionName}>
                    {p.positionName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                placeholder="Субботин"
                {...register('user', {
                  required: { value: true, message: 'Пользоваль долно быть заполнена' },
                })}
              />
            )}
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
                valueAsNumber: true,
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
          <div className={formStyle.fieldContainer}>
            <label htmlFor="time">Время</label>
            <input
              type="number"
              defaultValue={0}
              placeholder="Время"
              {...register('time', {
                min: { value: 0, message: 'Время не может быть отрицательным' },
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
