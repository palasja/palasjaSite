import { useEffect, useState } from 'react';
import style from './services.module.css';
import { CostInfo, CostItem, CostUpdateItem, DescItem } from '../../../helpers/types';
import { fetchServiceCost, updateServiceCost, updateServiceDescCost } from '../../../helpers/api';
import { useForm, useFieldArray } from 'react-hook-form';

const validation = (arr: CostItem[] | DescItem[]) => {
  const atLeastOne = arr.find((sc) => !sc.cost && !sc.minCost && !sc.maxCost);
  if (atLeastOne) throw Error(`${atLeastOne.name} не заполнена ни одна стоимость`);

  const costOrMinMax = arr.find((sc) => sc.cost && (sc.minCost || sc.maxCost));
  if (costOrMinMax) throw Error(`${costOrMinMax.name} заполенеа стоимость и диапозон`);

  const costMaxMoreThanMin = arr.find((sc) => sc.minCost && sc.maxCost && sc.minCost > sc.maxCost);
  if (costMaxMoreThanMin) throw Error(`${costMaxMoreThanMin.name} минимальная больше максимальной`);
};

const Legend = () => {
  return (
    <div className={style.legend}>
    <span className={style.costField}>Ровно</span>
    <span className={style.costField}>От</span>
    <span className={style.costField}>До</span>
  </div>
  )
}
const Services = () => {
  const [services, setServices] = useState<CostInfo[]>([]);

  useEffect(() => {
    const getServicesCost = async () => {
      const sc = await fetchServiceCost();
      setServices(sc);
    };
    getServicesCost();
  }, []);

  return (
    <section className={style.cost}>
      <h2 className={style.title}>Изменить стоимость</h2>
      {services.map((info, i) => {
        return (
          <div key={i}>
            {info.name ? <h5 className={style.proposTitle}>{info.name}</h5> : ''}
            <ServiceTable items={info} />
          </div>
        );
      })}
      {services.map((info) => {
        return info.services.map((serv, i) => {
          if (serv.serviceDesc.length != 0) {
            return (
              <div key={i}>
                <DescTable items={serv} />
              </div>
            );
          }
          return undefined;
        });
      })}
    </section>
  );
};

const ServiceTable = (props: { items: CostInfo }) => {
  const [updateResult, setUpdateResult] = useState('');
  const { register, control, handleSubmit, reset } = useForm<CostInfo>({
    defaultValues: props.items,
  });

  const onSubmit = async (data: CostInfo) => {
    setUpdateResult('');
    try {
      validation(data.services);

      const costArray: CostUpdateItem[] = data.services.map((sd) => {
        return {
          id: sd.id,
          cost: sd.cost,
          minCost: sd.minCost,
          maxCost: sd.maxCost,
        };
      });
      await updateServiceCost(costArray);
    } catch (e: unknown) {
      setUpdateResult((e as Error).message);
    }
  };
  useEffect(() => {
    reset(props.items);
  }, [props.items]);

  const { fields } = useFieldArray({
    control,
    name: 'services',
  });

  return (
    <>
      <h5>{updateResult}</h5>
      <Legend />
      <form onSubmit={handleSubmit(onSubmit)} className={style.costForm}>
        {fields.map((field, index) => (
          <div key={field.id} className={style.costFormRow}>
            <span className={style.name}>{fields[index].name}</span>
            <span className={style.costListItemLine}></span>{' '}
            <div>
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`services.${index}.cost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`services.${index}.minCost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`services.${index}.maxCost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
            </div>
          </div>
        ))}
        <input type="submit" className={style.submit} />
      </form>
    </>
  );
};

const DescTable = (props: { items: CostItem }) => {
  const [updateResult, setUpdateResult] = useState('');
  const { register, control, handleSubmit, reset } = useForm<CostItem>({
    defaultValues: props.items,
  });

  const onSubmit = async (data: CostItem) => {
    setUpdateResult('');
    try {
      validation(data.serviceDesc);

      const costArray: CostUpdateItem[] = data.serviceDesc.map((sd) => {
        return {
          id: sd.id,
          cost: sd.cost,
          minCost: sd.minCost,
          maxCost: sd.maxCost,
        };
      });
      await updateServiceDescCost(costArray);
    } catch (e: unknown) {
      setUpdateResult((e as Error).message);
    }
  };

  useEffect(() => {
    reset(props.items);
  }, [props.items]);

  const { fields } = useFieldArray({
    control,
    name: 'serviceDesc',
  });

  return (
    <>
      <h5 className={style.proposTitle}>{props.items.name}</h5>
      <h5>{updateResult}</h5>
      <Legend />
      <form onSubmit={handleSubmit(onSubmit)} className={style.costForm}>
        {fields.map((field, index) => (
          <div key={field.id} className={style.costFormRow}>
            <span className={style.name}>{fields[index].name}</span>
            <span className={style.costListItemLine}></span>{' '}
            <div>
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`serviceDesc.${index}.cost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`serviceDesc.${index}.minCost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
              <input
                placeholder="-"
                className={style.costField}
                type="number"
                {...register(`serviceDesc.${index}.maxCost` as const, {
                  min: 1,
                  setValueAs: (v) => (v?.length === 0 ? null : v),
                })}
              />
            </div>
          </div>
        ))}
        <input type="submit" className={style.submit} />
      </form>
    </>
  );
};
export default Services;
