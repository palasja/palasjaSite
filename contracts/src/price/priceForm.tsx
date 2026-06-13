import style from './price.modole.css';
import formStyle from '../assets/form.module.css';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Price } from '../helpers/contractTypes';
import { trimObjectProperty } from '../helpers/helper';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch } from '../redux/hooks';
import { chosenAction } from '../redux/slices/orgsSlice';
import { useAddPriceMutation, useUpdatePriceMutation } from '../redux/slices/priceRTKSlice';

type ChangingPriceFormProps = { changingPrice: Price | undefined };
const PriceForm = ({ changingPrice }: ChangingPriceFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Price>();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const [addPrice] = useAddPriceMutation();
  const [updatePrice] = useUpdatePriceMutation();
  const dispatch = useAppDispatch();
  const onSubmitCreate: SubmitHandler<Price> = (data) => {
    data = trimObjectProperty(data);
    addPrice(data);
    resetForm();
  };
  const onSubmitUpdate: SubmitHandler<Price> = (data) => {
    data = trimObjectProperty(data);
    updatePrice(data);
    resetForm();
  };

  const resetForm = () => {
    dispatch(chosenAction('show'));
  };
  useEffect(() => {
    if (changingPrice) {
      setValue('id', changingPrice.id);
      setValue('serviceName', changingPrice.serviceName);
      setValue('cost', changingPrice.cost);
      setValue('description', changingPrice.description);
    }
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}
        className={formStyle.form}
      >
        <div className="error">
          <p>{errors.serviceName?.message}</p>
          <p>{errors.cost?.message}</p>
        </div>
        {/* No id field if wishout org */}
        <div className={formStyle.fieldsContainer}>
          <div className={formStyle.fieldContainer}>
            <label htmlFor="name">Услуга</label>
            <input
              placeholder="Чистка ПК"
              {...register('serviceName', {
                required: { value: true, message: 'Имя услуги должно быть заполнено' },
              })}
            />
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

export default PriceForm;
