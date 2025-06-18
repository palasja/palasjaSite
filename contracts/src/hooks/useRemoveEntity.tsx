import { useState } from "react";

export const useRemoveEntity = () => {
    const [isShowRemoveModal, setIsShowRemoveModal] = useState(false);
    const [removeId, setRemoveId] = useState(-1);

    return { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId }
}