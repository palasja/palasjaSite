// import { useCookies } from 'react-cookie';
import { API } from '../../../helpers/constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import style from './auth.module.css';
type FormValues = {
  login: string;
  password: string;
};

const Auth = (props: { setAuth: (isAuth: boolean) => void }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLock, setisLock] = useState(false);
  const [errorMeaasge, setErrorMeaasge] = useState();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status == 200) {
        props.setAuth(true);
      } else if (res.status == 401) {
        setErrorMeaasge((await res.json()).message);
      } else if (res.status == 403) {
        setisLock(true);
      }
    });
    // .then ( async(res) => {
    //   if(res.status == 200)
    //   {
    //     setCookie('isAuth', true, {maxAge: 5000});
    //   } else if (res.status == 401) {
    //     setErrorMeaasge((await res.json()).message);
    //   }
    // })
  };
  return (
    isLock ? (<h2 className={style.lockMessge}>Данные были введены неверно более 10 раз. Обратитесь к администратору</h2>) : 
    <section className={style.auth}>
      <h1 className={style.authBgText}>
        Gusak <span className={style.firstName}>Maria</span>
      </h1>
      <div className={style.formContainer}>
        <h3 className={style.formName}>Войти</h3>
        <p className={style.errorMeaasge}>{errorMeaasge}</p>
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
  );
};

export default Auth;
