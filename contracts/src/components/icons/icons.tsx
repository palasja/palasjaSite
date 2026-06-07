import style from './icons.module.css';
import { default as EditIconMaterial } from '@mui/icons-material/Edit';
import { default as RemoveIconMaterial } from '@mui/icons-material/Remove';
import { default as AddBoxIconMaterial } from '@mui/icons-material/AddBox';
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
import { default as ListIconMaterial } from '@mui/icons-material/ViewList';
type IconProp = { onClick?: () => void; testid?: string };
export const RemoveIcon = () => (
  <RemoveIconMaterial className={`${style.common} ${style.changeColor}`} />
);
export const EditIcon = () => (
  <EditIconMaterial className={`${style.common} ${style.changeColor}`} />
);
export const AddIcon = ({ onClick, testid }: IconProp) => (
  <button className={style.addButton} onClick={onClick} data-testid={testid}>
    <span className={style.addContainer}>
      <AddBoxIconMaterial className={`${style.common} ${style.changeColor}`} />
    </span>
  </button>
);
export const AddOrgIcon = () => (
  <AddBoxIconMaterial className={`${style.common} ${style.changeColor}`} />
);
export const PayIcon = ({ onClick }: IconProp) => (
  <CreditScoreIconMaterial onClick={onClick} className={`${style.common} ${style.changeColor}`} />
);
export const UnpayIcon = ({ onClick }: IconProp) => (
  <CreditCardOffIconMaterial onClick={onClick} className={`${style.common} ${style.changeColor}`} />
);
export const ServicesIcon = () => <BuildIconMateria className={style.common} />;
export const PersonalIcon = () => <GroupsIconMaterial className={style.common} />;
export const ActIcon = () => <EditDocumentIcon className={style.common} />;
export const LogoutIcon = () => (
  <MeetingRoomIconMaterial className={`${style.common} ${style.logout}`} />
);
export const DownloadIcon = () => <DownloadIconMaterial className={style.common} />;
export const StatIcon = () => <LeaderboardIconMaterial className={`${style.common}`} />;
export const SoftIcon = () => <AppsIconMaterial className={`${style.common}`} />;
export const ContractIcon = () => <ContentPasteIconMaterial className={`${style.common}`} />;
export const ListIcon = () => <ListIconMaterial className={`${style.common}`} />;
