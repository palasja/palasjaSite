import { useForm, SubmitHandler } from 'react-hook-form';
import style from './login.module.css';
import { Link, useNavigate } from 'react-router';
import {
  useLazyCheckQuery,
  useLazyLoginQuery,
  useLazySigninQuery,
} from '../../redux/slices/authRTKSlce';
import { useEffect, useState } from 'react';
import authImg from '/loginImg.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeIsAuth, changeIsCheked, getIsChecked } from '../../redux/slices/authSlice';

type FormValues = {
  login: string;
  password: string;
};

const Login = ({ isSignin = false }: { isSignin: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [login] = useLazyLoginQuery();
  const [signin] = useLazySigninQuery();
  const [check] = useLazyCheckQuery();
  const isCheked = useAppSelector(getIsChecked);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmitLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await login(data).unwrap();
      if (result == 'OK') {
        dispatch(changeIsAuth(true));
        navigate('/org');
      }
    } catch {
      setIsError(true);
    }
  };
  const onSubmitSignin: SubmitHandler<FormValues> = async (data) => {
    const result = await signin(data).unwrap();
    if (result == 'OK') navigate('/org');
  };
  useEffect(() => {
    const checkAuth = async () => {
      dispatch(changeIsCheked(true));
      const result = await check().unwrap();
      if (result == 'OK') {
        dispatch(changeIsAuth(true));

        navigate('/org');
      }
    };
    if (!isCheked) checkAuth();
  }, []);
  return (
    isCheked && (
      <>
        <section className={style.auth}>
          <div className={style.imageBlock}>
            <img className={style.image} src={authImg} />
            <p className={style.imageText}>
              Сайт предназначен для учёта договоров, оказаных услуг и заметок об используемых
              программах.
            </p>
          </div>
          <div className={style.formContainer}>
            <h3 className={style.formName}>{isSignin ? 'Регистрация' : 'Войти'}</h3>
            {isError && <p className={style.errorMeaasge}>Неверный логин или пароль</p>}
            {errors.login && <p className={style.errorMeaasge}>{errors.login.message}</p>}
            {errors.password && <p className={style.errorMeaasge}>{errors.password.message}</p>}
            <form
              onSubmit={handleSubmit(isSignin ? onSubmitSignin : onSubmitLogin)}
              className={style.form}
            >
              <input
                className={style.inputField}
                data-testid="login"
                placeholder="Логин"
                {...register('login', {
                  required: { value: true, message: 'Логин должно быть заполнено' },
                  maxLength: 10,
                })}
              />
              <input
                data-testid="pass"
                placeholder="Пароль"
                className={style.inputField}
                {...register('password', {
                  required: { value: true, message: 'Пароль должно быть заполнено' },
                  maxLength: 10,
                })}
              />
              <div className={style.submitBlock}>
                <input
                  className={style.submit}
                  type="submit"
                  value={isSignin ? 'Отправить' : 'Войти'}
                  data-testid="submit"
                />
                {/* {isSignin ? (
                  <Link to={'/login'} className={style.link}>
                    Войти
                  </Link>
                ) : (
                  <Link to={'/signIn'} className={style.link}>
                    Зарегистрироваться
                  </Link>
                )} */}
              </div>
            </form>
          </div>
        </section>
      </>
    )
  );
};

export default Login;
