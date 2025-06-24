import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './experience.module.css';
import { useTranslation } from 'react-i18next';

const Experience = () => {
    const { t } = useTranslation();
  return(
    <ContentWrapper>
      <h4>{t('home.cw.experiance.experiance')}</h4>
      <p>
        {t('home.cw.experiance.factory')} - {t('home.cw.experiance.factoryDate')}
      </p>
      <p>
        {t('home.cw.experiance.ivc')} - {t('home.cw.experiance.ivcDate')}
      </p>
      <ul>
        <li>
          Установка и настройка MS SQL Server 2003/2008. Администрирование БД. Настройка
          резервного копирования баз.
        </li>
        <li>
          Установка и настройка Firebird SQL Server 2.1/2.5. Администрирование БД. Настройка
          резервного копирования баз.
        </li>
        <li>Установка и настройка Oracle Database. Администрирование БД.</li>
        <li>
          Установка и настройка ОС семейства Windows (XP, 7, 8, 10) и Windows Server (2003,
          2012).
        </li>
        <li>
          Установка и настройка приклодного ПО (финансовая система, банки, порталы, средства
          криптозащиты).
        </li>
        <li>
          Установка и настройка переферийных устройств (МФУ, сканеры, принтеры, ID считываетли).
        </li>
        <li>Разворачивание ОС на системах виртуализации (VMWare, VSphere).</li>
        <li>Регламентные проверки и обслуживание оборудования. Диагностика неисправностей</li>
        <li>
          Консультации и обучение пользователей по работе с ПО и оборудованием. Реклама новых
          программных продуктов компании.
        </li>
        <li>
          Прокладывание, настройка и обслуживание локальной сети и настройка сетевого
          оборудования.
        </li>
        <li>
          Настройка и обслуживание каналов связи (Radius, Argus, Dial-Up, ADSL, FTP, VPN).
        </li>
        <li>
          Автоматизация рабочих процессов: Анализ логов работы ПО, Диагностика копирования и
          хранения бэкапов БД, Создание отчётов по состоянию ПК
        </li>
        <li>
          Front-End разработка: Создание и стилизация пользовательского интерфейса, Создание
          табличных форм, Подписание документов сертификатом X.509 и отправка документов на
          сервер.
        </li>
      </ul>
    </ContentWrapper>
  );
}

export default Experience