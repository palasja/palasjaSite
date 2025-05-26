// import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './auth.module.css';
import { useAuth } from '../hooks/protectedRoute/useAuth';
import { Link } from 'react-router';
import { fetchLogIn } from '../helpers/api';

type FormValues = {
  login: string;
  password: string;
};

const Auth = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  // const [isLock, _setisLock] = useState(false);
  // const [errorMeaasge, _setErrorMeaasge] = useState();
  const { onLogin } = useAuth();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const signInResult = await fetchLogIn(data);
    if (signInResult == 200) {
      onLogin();
    }
  };
  return (
    // isLock ? (<h2 className={style.lockMessge}>Данные были введены неверно более 10 раз. Обратитесь к администратору</h2>) :
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
  );
};

export default Auth;
