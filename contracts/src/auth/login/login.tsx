import { useForm, SubmitHandler } from 'react-hook-form';
import style from './login.module.css';
import { Link, useNavigate } from 'react-router';
import { useLazyCheckQuery, useLazyLoginQuery } from '../../redux/slices/authRTKSlce';
import { useEffect, useState } from 'react';

type FormValues = {
  login: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [login] = useLazyLoginQuery();
  const [check] = useLazyCheckQuery();
  const [isCheked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false)
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try{
      let result = await login(data).unwrap();
      if (result == 'OK')  navigate('/contract')
    } catch {
      setIsError(true);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        let result = await check().unwrap();
        if (result == 'OK') navigate('/contract')
      } catch {
        setIsChecked(true);
      }
    };
    checkAuth();
  }, []);
  return (
    isCheked && (
      <>
        <section className={style.auth}>
          <Link to={'/signIn'}>signIn</Link>
          <div className={style.formContainer}>
            <h3 className={style.formName}>Войти</h3>
            {isError && <p className={style.errorMeaasge}>Неверный логин или пароль</p>}
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
      </>
    )
  );
};

export default Login;
