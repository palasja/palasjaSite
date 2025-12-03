import style from './icons.module.css';
import { default as EditIconMaterial } from '@mui/icons-material/Edit';
import { default as RemoveIconMaterial } from '@mui/icons-material/Remove';
import { default as AddBoxIconMaterial } from '@mui/icons-material/AddBox';
import { default as HighlightOffIconMaterial } from '@mui/icons-material/HighlightOff';
import { default as CreditScoreIconMaterial } from '@mui/icons-material/CreditScore';
import { default as CreditCardOffIconMaterial } from '@mui/icons-material/CreditCardOff';
import { default as ContentPasteIconMaterial } from '@mui/icons-material/ContentPaste';
import { default as BuildIconMateria } from '@mui/icons-material/Build';
import { default as GroupsIconMaterial } from '@mui/icons-material/Groups';
import { default as EditDocumentIcon } from '@mui/icons-material/EditDocument';
import { default as MeetingRoomIconMaterial } from '@mui/icons-material/MeetingRoom';
import { default as DownloadIconMaterial } from '@mui/icons-material/Download';
import { default as LeaderboardIconMaterial } from '@mui/icons-material/Leaderboard';
import { default as AppsIconMaterial } from '@mui/icons-material/Apps';
// Изменить
// // import EditIcon from '@mui/icons-material/Edit';
// Добавить
// // import AddIcon from '@mui/icons-material/Add';
// Удалить
// // import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Оплачено
// // import CreditScoreIcon from '@mui/icons-material/CreditScore';
// Неоплачено
// // import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
// Договора
// // import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// Услуги
// // import CallEndIcon from '@mui/icons-material/CallEnd';
// Персонал
// // import GroupsIcon from '@mui/icons-material/Groups';

// Очистить
// //
// Выход
// // import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// Скачать
// // для скана import DownloadIcon from '@mui/icons-material/Download';

// Для
// // мобилки
// Договора
// //
// Статистика
// // import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// ПО
// // import AppsIcon from '@mui/icons-material/Apps';

type IconProp = { onClick?: () => void };
export const RemoveIcon = () => <RemoveIconMaterial className={style.common} />;
export const EditIcon = () => <EditIconMaterial className={style.common} />;
export const AddIcon = ({ onClick }: IconProp) => (
  <span className={style.addContainer} onClick={onClick}>
    <AddBoxIconMaterial className={`${style.common} ${style.add}`} />
  </span>
);
export const AddOrgIcon = () => (
  <AddBoxIconMaterial className={`${style.common} ${style.addOrg}`} />
);
export const PayIcon = ({ onClick }: IconProp) => (
  <CreditScoreIconMaterial onClick={onClick} className={`${style.common} ${style.pay}`} />
);
export const UnpayIcon = ({ onClick }: IconProp) => (
  <CreditCardOffIconMaterial onClick={onClick} className={`${style.common} ${style.pay}`} />
);
export const ServicesIcon = () => <BuildIconMateria className={style.common} />;
export const PersonalIcon = () => <GroupsIconMaterial className={style.common} />;
export const ActIcon = () => <EditDocumentIcon className={style.common} />;
export const LogoutIcon = () => (
  <MeetingRoomIconMaterial className={`${style.common} ${style.logout}`} />
);
export const DownloadIcon = () => <DownloadIconMaterial className={style.common} />;
export const StatIcon = () => (
  <LeaderboardIconMaterial className={`${style.common} ${style.mainIcon}`} />
);
export const SoftIcon = () => <AppsIconMaterial className={`${style.common} ${style.mainIcon}`} />;
export const ContractIcon = () => (
  <ContentPasteIconMaterial className={`${style.common} ${style.mainIcon}`} />
);
