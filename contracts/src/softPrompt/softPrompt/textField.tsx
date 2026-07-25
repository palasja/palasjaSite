import style from './../softPrompt.module.css';

const TextField = ({ text }: { text: string | undefined }) => {
  return <div className={style.textFieldInfo}>{text ? text : ''}</div>;
};

export default TextField;
