// import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './auth.module.css';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuthErrorMessage, getAuthSatus, login } from '../redux/slices/authSlice';

type FormValues = {
  login: string;
  password: string;
};

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMessage = useAppSelector(getAuthErrorMessage);
  const status = useAppSelector(getAuthSatus);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((r: boolean) => {
        if (r) navigate('/contract');
      });
  };

  return (
    <>
      {status === 'pending' ? (
        <>Loading...</>
      ) : (
        <section className={style.auth}>
          <Link to={'/signIn'}>signIn</Link>
          <div className={style.formContainer}>
            <h3 className={style.formName}>Войти</h3>
            {errorMessage && <p className={style.errorMeaasge}>{errorMessage}</p>}
            {errors.login && <p className={style.errorMeaasge}>{errors.login.message}</p>}
            {errors.password && <p className={style.errorMeaasge}>{errors.password.message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
              <div className={style.inputField}>
                <label className={style.label} htmlFor="login">
                  Логин
                </label>
                <input
                  data-testid="login"
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
                  data-testid="pass"
                  className={style.input}
                  {...register('password', {
                    required: { value: true, message: 'Пароль должно быть заполнено' },
                    maxLength: 10,
                  })}
                />
              </div>
              <input className={style.submit} type="submit" value="Войти" data-testid="submit" />
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Auth;
