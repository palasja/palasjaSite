import face from 'assets/yakubenka_face.jpg';
import style from './home.module.css';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const { t } = useTranslation();
  return(
    <>
        <img src={face} style={{height: '100px', float: 'left'}}></img>
        <p>{t('home.text')}</p>
    </>
  );
}

export default Home;