import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Service } from '../helpers/contractTypes';
import { addService, fetchServices, removeService, updateService } from '../helpers/api';
import style from './services.module.css';
import { getServicesCost, getServicesCostWithNDS } from '../helpers/helper';
import { NDS } from '../helpers/constants';
import { Link } from 'react-router';

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
  const [actMonth, setActMonth] = useState((new Date().getMonth() + 1));
  const [isUpdate, setIsUpdate] = useState(false);

  const handletActMonth = (month: number): void => setActMonth(month);
  useEffect(() => {
    const getPersonals = () => {
      fetchServices(orgId).then((orgs) => setServices(orgs));
    };
    getPersonals();
  }, [orgId]);
  return (
    <>
      <h3>Services</h3>
      <div>
        <select onChange={(e) => handletActMonth(Number(e.target.value))}>
          {[...new Array(12)].map((_e, i) => {
            return (
              <option value={i + 1} key={i}  selected={i+1 === actMonth}>
                {i + 1}
              </option>
            )
          })}
        </select>
        <Link to={`/act_pms/${orgId}/${actMonth}`}>ACT PMS {orgId}/{actMonth}</Link>
        <Link to={`/act_zkh/${orgId}/${actMonth}`}>ACT ZKH {orgId}/{actMonth}</Link>
      </div>
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
            reset();
            setValue('id', orgId);
          }}
        >
          Очистить
        </button>
      </form>
      <p>My cost = {getServicesCost(services)}</p>
      <p>Cost with NDS = {getServicesCostWithNDS(services)}</p>
      <p>
        Get after NDS ={' '}
        {getServicesCostWithNDS(services) - getServicesCostWithNDS(services) * (NDS / 100)}
      </p>

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
};

export default Services;
