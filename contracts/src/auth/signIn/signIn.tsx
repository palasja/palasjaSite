// import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './signIn.module.css';

import { Link, useNavigate } from 'react-router';
import { useLazySigninQuery } from '../../redux/slices/authRTKSlce';

type FormValues = {
  login: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [signin] = useLazySigninQuery();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signin(data).unwrap();
    if (result == 'OK') navigate('/contract');
  };
  return (
    <section className={style.auth}>
      <Link to={'/login'}>Вход</Link>
      <div className={style.formContainer}>
        <h3 className={style.formName}>Регистрация</h3>
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
