import style from './softPromptForm.module.css';

type TextFieldProps = {
  id: string;
  setActive: (e: any) => void;
  text?: string;
};

const TextField = ({ id, text = undefined, setActive }: TextFieldProps) => {
  return (
    <textarea
      area-soft-info=""
      id={id}
      className={style.field}
      onClick={setActive}
      defaultValue={text}
    />
  );
};

export default TextField;
