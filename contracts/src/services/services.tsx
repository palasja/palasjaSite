import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { addService, fetchServices, removeService, updateService } from '../helpers/api';
import style from './services.module.css';
import { getServicesCost, getServicesCostWithNDS } from '../helpers/helper';
import { NDS } from '../helpers/constants';

const onSubmitCreate: SubmitHandler<Service> = (data) => {
  addService(data);
};
const onSubmitUpdate: SubmitHandler<Service> = (data) => {
  updateService(data);
};
type contractProps = {
  orgId: string;
};
const Services = ({ orgId }: contractProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<Service>();
  const [services, setServices] = useState<Service[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const getPersonals = () => {
      fetchServices(orgId).then((orgs) => setServices(orgs));
    };
    getPersonals();
  }, [orgId]);
  return (
    <>
      <h3>Services</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <div>
          <input value={orgId} type="hidden" {...register('orgId', { required: true })} />
          <label htmlFor="name">Name</label>
          <input {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" {...register('date', { required: true })} />
        </div>
        <div>
          <label htmlFor="user">User</label>
          <input {...register('user', { required: true })} />
        </div>
        <div>
          <label htmlFor="place">Place</label>
          <input {...register('place')} />
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input type="number" {...register('cost')} />{' '}
        </div>
        <div>
          <label htmlFor="count">Count</label>
          <input type="number" defaultValue={1} {...register('count')} />
        </div>
        <input type="submit" value={isUpdate ? 'Update' : 'Create'} />
        <button
          onClick={() => {
            setIsUpdate(false);
            reset()
          }}
        >
          Очистить
        </button>
      </form>
          <p>My cost =  {getServicesCost(services)}</p>
          <p>Cost with NDS =  {getServicesCostWithNDS(services)}</p>
          <p>Get after NDS = {getServicesCostWithNDS(services) - (getServicesCostWithNDS(services) * (NDS / 100))}</p>

      <ul>
        {services.length == 0
          ? ''
          : services.map((service, i) => {
              return (
                <li key={i}>
                  {`${service.name} ${service.date}`}
                  <button
                    onClick={async () => {
                      await removeService({ id: Number(service.id) });
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
}

export default Services;
