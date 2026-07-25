import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { SoftInfoForm } from '../../helpers/contractTypes';
import { RemoveIcon } from '../../components/icons/icons';
import style from './softPromptForm.module.css';

type LinkRowProps = {
  id: string;
  index: number;
  register: UseFormRegister<SoftInfoForm>;
  errors: FieldErrors<SoftInfoForm>;
  remove: UseFieldArrayRemove;
};

const LinkRow = ({ id, index, register, errors, remove }: LinkRowProps) => {
  return (
    <div key={id}>
      <section className={'section'} key={id}>
        <input
          value={`softLinks.${index}.id`}
          type="hidden"
          {...register(`softLinks.${index}.id` as const, {
            required: false,
          })}
        />
        <input
          placeholder="name"
          {...register(`softLinks.${index}.name` as const, {
            required: true,
          })}
          className={errors?.softLinks?.[index]?.name ? 'error' : ''}
        />
        <input
          placeholder="url"
          type="string"
          {...register(`softLinks.${index}.url` as const, {
            required: true,
          })}
          className={errors?.softLinks?.[index]?.url ? 'error' : ''}
        />
        <span onClick={() => remove(index)} className={style.removeIconCont}>
          <RemoveIcon />
        </span>
      </section>
    </div>
  );
};

export default LinkRow;
