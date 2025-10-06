import { useState } from "react";
import style from './detail.module.css';

export const useDetail = () => {
  const [isShowMobileDetail, setIsShowMibileDetail] = useState(false);
  const Detail = () => {
    return <p className={style.detail} onClick={() => setIsShowMibileDetail(!isShowMobileDetail)}>Подробнее...</p>
    }

  return {Detail, isShowMobileDetail}
}