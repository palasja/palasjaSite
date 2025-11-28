import { useForm, SubmitHandler } from 'react-hook-form';
import { Contract, OrgInfoAction } from '../helpers/contractTypes';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toBase64, trimObjectProperty } from '../helpers/helper';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { choseAct, getChosenOrganization } from '../redux/slices/orgsSlice';
import { useEffect } from 'react';
import {
  useAddContractMutation,
  useUpdateContractMutation,
} from '../redux/slices/contractRTKSlice';

type ChangingContractFormProps = {
  changingContract: Contract | undefined;
};

const ContractForm = ({ changingContract = undefined }: ChangingContractFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Contract>();
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [addContract] = useAddContractMutation();
  const [updateContract] = useUpdateContractMutation();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const resetForm = () => {
    dispatch(choseAct('show'));
    reset({
      orgId: choosenOrg?.id.toString(),
    });
  };
  const onSubmitCreate: SubmitHandler<Contract> = async (data) => {
    data = trimObjectProperty(data);
    //@ts-expect-error: Chome has faleArray instead of File
    data.scan = await toBase64(data.scan[0]);
    addContract(data);
    resetForm();
  };

  const onSubmitUpdate: SubmitHandler<Contract> = async (data) => {
    data = trimObjectProperty(data);
    if (data.scan?.size == 0) {
      //@ts-expect-error: Chome has fileArray instead of File
      delete data.scan;
    } else {
      //@ts-expect-error: Chome has fileArray instead of File
      data.scan = await toBase64(data.scan[0]);
    }
    updateContract(data);
    resetForm();
  };
  useEffect(() => {
    if (changingContract) {
      setValue('id', changingContract.id);
      setValue('number', changingContract.number);
      setValue('signDate', changingContract.signDate);
      setValue('startDate', changingContract.startDate);
      setValue('endDate', changingContract.endDate);
      setValue('scan', new File([], ''));
    }
  }, []);
  return (
    <>
      {errors.number && <p>{errors.number.message}</p>}
      {errors.endDate && <p>{errors.endDate.message}</p>}
      {errors.signDate && <p>{errors.signDate.message}</p>}
      {errors.startDate && <p>{errors.startDate.message}</p>}
      {errors.scan && <p>{errors.scan.message}</p>}

      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        <input
          value={choosenOrg!.id}
          type="hidden"
          {...register('orgId', { required: true, maxLength: 20 })}
        />
        <div>
          <label htmlFor="number">Номер</label>
          <input
            {...register('number', {
              required: { value: true, message: 'Номер долно быть заполнено' },
              maxLength: { value: 20, message: 'Поле номер должно быть меньше 20' },
            })}
          />
        </div>
        <div>
          <label htmlFor="signDate">Дата подписания</label>
          <input
            type="date"
            {...register('signDate', {
              required: { value: true, message: 'Дата подписания долна быть заполнена' },
            })}
          />
        </div>
        <div>
          <label htmlFor="startDate">Начало договра</label>
          <input
            type="date"
            {...register('startDate', {
              required: { value: true, message: 'Начало договра долно быть заполнено' },
            })}
          />
        </div>
        <div>
          <label htmlFor="endDate">Окончание договора</label>
          <input
            type="date"
            {...register('endDate', {
              required: { value: true, message: 'Окончание договора долно быть заполнено' },
            })}
          />
        </div>
        <div>
          <input type="file" {...register('scan')} />
        </div>

        <input type="submit" value={btnValue} />
        <button onClick={() => resetForm()}>Очистить</button>
      </form>
    </>
  );
};

export default ContractForm;
