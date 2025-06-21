// import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './auth.module.css';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { check, getIsAuth, login } from '../redux/slices/authSlice';
import { useEffect } from 'react';

type FormValues = {
  login: string;
  password: string;
};

const Auth = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
     dispatch(login(data)).then(() => {
      navigate('/contract');
     })
  };
  useEffect(() =>{
    dispatch(check());
  },[]);
  return (
    <>
      <section className={style.auth}>
        <Link to={'/signIn'}>signIn</Link>
        <div className={style.formContainer}>
          <h3 className={style.formName}>Войти</h3>
          {/* <p className={style.errorMeaasge}>{errorMeaasge}</p> */}
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.inputField}>
              <label className={style.label} htmlFor="login">
                Логин
              </label>
              <input
                className={style.input}
                {...register('login', { required: true, maxLength: 10 })}
              />
            </div>
            <div className={style.inputField}>
              <label className={style.label} htmlFor="password">
                Пароль
              </label>
              <input
                className={style.input}
                {...register('password', { required: true, maxLength: 10 })}
              />
            </div>
            <input className={style.submit} type="submit" value="Войти" />
          </form>
        </div>
      </section>
      </>
  );
};

export default Auth;
