import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Contract } from '../helpers/contractTypes';
import {
  fetchContractsScan,
} from '../helpers/api';
import { toBase64 } from '../helpers/helper';
import style from './contracts.module.css';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addContract, delContract, editContract, fetchContractsByOrgId, getAllContracts } from '../features/contracts/contractSlice';
import { getChosenOrganization } from '../features/orgs/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';

type T0 = NonNullable<string | number | undefined>;
function Contracts() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Contract>();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const dispatch = useAppDispatch();
  const contracts = useAppSelector(getAllContracts);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const {btnValue, isUpdate, setIsUpdate} = useIsUpdate();
  const onSubmitCreate: SubmitHandler<Contract> = async (data) => {
    //@ts-expect-error: Chome has faleArray instead of File
    data.scan = await toBase64(data.scan[0]);
    dispatch(addContract(data));
    resetForm();
  };

  const onSubmitUpdate: SubmitHandler<Contract> = async (data) => {
    if (data.scan?.size == 0) {
      //@ts-expect-error: Chome has faleArray instead of File
      delete data.scan;
    } else {
      //@ts-expect-error: Chome has faleArray instead of File
      data.scan = await toBase64(data.scan[0]);
    }
     dispatch(editContract(data))
    resetForm();
  };

  const resetForm = () => {
    reset({
      orgId: choosenOrg?.id.toString(),
    });
    setIsUpdate(false);
  };

  useEffect(() => {
    choosenOrg && dispatch(fetchContractsByOrgId( choosenOrg.id))
  }, []);
  return (
    <>
      <h3>Договора</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        {errors.number && <span role="alert">{errors.number.message}</span>}
        <input
          value={ choosenOrg!.id}
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
          {errors.scan && <p>{errors.scan.message}</p>}
        </div>

        <input type="submit" value={btnValue} />
        <button
          onClick={() => {
            resetForm();
          }}
        >
          Очистить
        </button>
      </form>
      <ul>
        {contracts.length == 0
          ? ''
          : contracts.map((con, i) => {
              return (
                <li key={i}>
                  {con.number}
                  <button onClick={() => fetchContractsScan(con.id)}>Scan</button>
                  <button
                    onClick={() => {
                      setRemoveId(con.id);
                      setIsShowRemoveModal(true);
                    }}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', con.id);
                      setValue('number', con.number);
                      setValue('signDate', con.signDate);
                      setValue('startDate', con.startDate);
                      setValue('endDate', con.endDate);
                      setValue('scan', new File([], ''));
                    }}
                  >
                    Переименовать
                  </button>
                </li>
              );
            })}
      </ul>
      {isShowRemoveModal && <RemoveAgreePortal remove={() => dispatch(delContract(removeId))} hide={() => setIsShowRemoveModal(false)}/>}
    </>
  );
}

export default Contracts;
