// import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './signIn.module.css';

import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthErrorMessage, getIsAuth, signin } from '../redux/slices/authSlice';

type FormValues = {
  login: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMessage = useAppSelector(getAuthErrorMessage);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signin(data)).unwrap().then((r: boolean) => {if(r) navigate('/contract')});
  };
  return (
    // isLock ? (<h2 className={style.lockMessge}>Данные были введены неверно более 10 раз. Обратитесь к администратору</h2>) :
    <section className={style.auth}>
      <div className={style.formContainer}>
        <h3 className={style.formName}>Регистрация</h3>
        {errorMessage && <p className={style.errorMeaasge}>{errorMessage}</p>}
        {errors.login && <p className={style.errorMeaasge}>{errors.login.message}</p>}
        {errors.password && <p className={style.errorMeaasge}>{errors.password.message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.inputField}>
            <label className={style.label} htmlFor="login">
              Логин
            </label>
            <input
              className={style.input}
              {...register('login', {
                  required: { value: true, message: 'Логин должно быть заполнено' },
                  maxLength: 10,
              })}
            />
          </div>
          <div className={style.inputField}>
            <label className={style.label} htmlFor="password">
              Пароль
            </label>
            <input
              className={style.input}
                {...register('password', {
                  required: { value: true, message: 'Пароль должно быть заполнено' },
                  maxLength: 10,
                })}
            />
          </div>
          <input className={style.submit} type="submit" value="Registration" />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
