import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { addService, fetchServices, removeService, updateService } from '../helpers/api';
import style from './services.module.css';
import {
  getServicesCost,
  getServicesCostWithNDS,
  getServicesCostWithNDS_47,
} from '../helpers/helper';
import { NDS, NDS_VICHET, PENSIA } from '../helpers/constants';
import { Link } from 'react-router';

type contractProps = {
  orgId: string;
};

const Services = ({ orgId }: contractProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<Service>();
  const [services, setServices] = useState<Service[]>([]);
  const [actMonth, setActMonth] = useState(new Date().getMonth() + 1);
  const [isUpdate, setIsUpdate] = useState(false);

  const handlerService = () => {
    fetchServices(orgId).then((orgs) => setServices(orgs));
  };
  const onSubmitCreate: SubmitHandler<Service> = (data) => {
    addService(data).then(handlerService);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Service> = (data) => {
    updateService(data).then(handlerService);
    resetForm();
  };
  const handletActMonth = (month: number): void => setActMonth(month);
  useEffect(() => {
    handlerService();
  }, [orgId]);

  const resetForm = () => {
    reset({ orgId: orgId });
    setIsUpdate(false);
  };

  return (
    <>
      <h3>Услуги</h3>
      <div>
        <select onChange={(e) => handletActMonth(Number(e.target.value))}>
          {[...new Array(12)].map((_e, i) => {
            return (
              <option value={i + 1} key={i} selected={i + 1 === actMonth}>
                {i + 1}
              </option>
            );
          })}
        </select>
      </div>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <input value={orgId} type="hidden" {...register('orgId', { required: true })} />
        <div>
          <label htmlFor="name">Услуга</label>
          <input
            {...register('name', {
              required: { value: true, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            {...register('date', {
              required: { value: true, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="user">Пользоваль</label>
          <input
            {...register('user', {
              required: { value: true, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="place">Место</label>
          <input {...register('place')} />
        </div>
        <div>
          <label htmlFor="cost">Стоимость</label>
          <input
            type="number"
            {...register('cost', {
              min: { value: 1, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="count">Количество</label>
          <input
            type="number"
            defaultValue={1}
            {...register('count', {
              min: { value: 1, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <input type="submit" value={isUpdate ? 'Изменить' : 'Создать'} />
        <button onClick={() => resetForm()}>Очистить</button>
      </form>

      <ul>
        {services.length == 0
          ? ''
          : services.map((service, i) => {
              return (
                <li key={i}>
                  {`${service.name} ${service.date}`}
                  <button
                    onClick={async () => {
                      await removeService({ id: Number(service.id) }).then(() => handlerService());
                    }}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', service.id);
                      setValue('name', service.name);
                      setValue('date', service.date);
                      setValue('user', service.user);
                      setValue('place', service.place);
                      setValue('cost', service.cost);
                      setValue('count', service.count);
                    }}
                  >
                    Изменить
                  </button>
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default Services;
