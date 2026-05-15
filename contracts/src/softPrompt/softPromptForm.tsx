import { SubmitHandler, useForm } from 'react-hook-form';
import { Organization as Org, SoftInfo } from '../helpers/contractTypes';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useEffect } from 'react';
import { trimObjectProperty } from '../helpers/helper';
import { useAddSoftInfoMutation, useUpdateSoftInfoMutation } from '../redux/slices/softInfoRTK';
import { AddIcon } from '../components/icons/icons';
import formStyle from 'assets/form.module.css';
type ChangingSoftInfoFormProps = { softInfo: SoftInfo | undefined; clearCallback: () => void };

const SoftPromptForm = ({ softInfo, clearCallback }: ChangingSoftInfoFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SoftInfo>();
  const { btnValue, isUpdate, setIsUpdate } = useIsUpdate();
  const [addSoftInfo] = useAddSoftInfoMutation();
  const [updateSoftInfo] = useUpdateSoftInfoMutation();

  const resetForm = () => {
    setIsUpdate(false);
    reset();
  };
  const onSubmitCreate: SubmitHandler<SoftInfo> = async (data) => {
    data = trimObjectProperty(data);
    try {
      await addSoftInfo(data).unwrap();
      clearCallback();
    } catch (err) {
      console.error('Failed to save the Name: ', err);
    }
  };
  const onSubmitUpdate: SubmitHandler<SoftInfo> = async (data) => {
    data = trimObjectProperty(data);
    try {
      await updateSoftInfo(data).unwrap();
      clearCallback();
    } catch (err) {
      console.error('Failed to save the Name: ', err);
    }
  };

  useEffect(() => {
    if (softInfo) {
      setIsUpdate(true);
      setValue('id', softInfo.id);
      setValue('name', softInfo.name);
    } else {
      resetForm();
    }
  }, [softInfo]);

  return (
    <>
      {errors.name && <p>{errors.name.message}</p>}
      <form
        onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}
        className={formStyle.form}
      >
        {isUpdate ? (
          <input id="id" type="hidden" {...register('id', { required: true })} data-testid="id" />
        ) : (
          <></>
        )}
        <div>
          <label htmlFor="name">Наименование Программы</label>
          <input
            data-testid="name"
            id="name"
            {...register('name', {
              required: { value: true, message: 'Наименование должно быть заполнено' },
              maxLength: { value: 40, message: 'Наименование должно быть меньше 40 символов' },
            })}
          />
        </div>
        <div className={formStyle.buttons}>
          <input type="submit" value={btnValue} data-testid="submit" />
          <input
            type="button"
            onClick={() => {
              resetForm();
              clearCallback();
            }}
            value={'Отмена'}
          />
        </div>
      </form>
    </>
  );
};

export default SoftPromptForm;
