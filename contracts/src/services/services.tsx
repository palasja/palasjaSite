import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateService, Service } from '../helpers/contractTypes';
// import { addService, fetchServicesByOrgIdMonth, removeService, updateService } from '../helpers/api';
import style from './services.module.css';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createService, delService, editService, fetchServicesByOrgIdMonth, getServices, getChoosenMonth, chooseMonth } from '../redux/slices/servicesSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';

type ServiceProps = {
  isWithoutOrg?:boolean
} ;

const Services = ({isWithoutOrg} :ServiceProps) => {

  const { register, handleSubmit, setValue, reset, formState: {errors} } = useForm<Service>();
  const dispatch = useAppDispatch();
  const services = useAppSelector(getServices);
  const choosenOrg = isWithoutOrg ? undefined : useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  // const [services, setServices] = useState<Service[]>([]);
  // const [actMonth, setActMonth] = useState(new Date().getMonth().toString());
  const {btnValue, isUpdate, setIsUpdate} = useIsUpdate();
  
  // const handlerService = () => {
  //   fetchServicesByOrgIdMonth(orgId, actMonth).then((orgs) => setServices(orgs));
  // };
  const onSubmitCreate: SubmitHandler<Service> = (data) => {
    dispatch(createService(data));
    // addService(data).then(handlerService);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Service> = (data) => {
    dispatch(editService(data));
    // updateService(data).then(handlerService);
    resetForm();
  };
  // const handletActMonth = (month: string): void => setActMonth(month);

  useEffect(() => {
    choosenOrg && dispatch(fetchServicesByOrgIdMonth({orgId:choosenOrg.id, month: choosenMonth}));
  }, [choosenMonth, choosenOrg?.id]);

  const resetForm = () => {
    reset({count: 1});
    if(choosenOrg) setValue('orgId', choosenOrg.id.toString());
    setIsUpdate(false);
  };

  return (
    <>
      <h3>Услуги</h3>
      <div>
        <select onChange={(e) => dispatch(chooseMonth(e.target.value))}>
          {[...new Array(12)].map((_e, i) => {
            return (
              <option value={i} key={i} selected={i.toString() === choosenMonth}>
                {i+1}
              </option>
            );
          })}
        </select>
      </div>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <p>{errors.orgId?.message}</p>
        {isWithoutOrg ?
        <></>  
          :
        <input value={choosenOrg?.id} type="hidden" {...register('orgId', { required:  { value: true, message: 'Не выбрана организация' } })} />        
        }
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
        <input type="submit" value={btnValue} />
        <input
          type="button"
          onClick={resetForm}
          value="Очистить"
        />
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
                      dispatch(delService(service.id));
                      // await removeService({ id: Number(service.id) }).then(() => handlerService());
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
