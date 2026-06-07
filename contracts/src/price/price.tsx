import { useState } from 'react';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import { useDeletePriceMutation, useGetPriceQuery } from '../redux/slices/priceRTKSlice';
import style from './price.module.css';
import PriceTable from './priceTable';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenchosenAction, chosenAction } from '../redux/slices/orgsSlice';
import PriceForm from './priceForm';
import { Price as PriceType } from '../helpers/contractTypes';
import { AddIcon } from '../components/icons/icons';

const Price = () => {
  const [deletePrice] = useDeletePriceMutation();
  const dispatch = useAppDispatch();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const { data: priceList = [], isLoading, isFetching } = useGetPriceQuery();
  const action = useAppSelector(getChosenchosenAction);
  const [changingPrice, setChangingPrice] = useState<PriceType | undefined>();

  const changeHandler = (price: PriceType) => {
    setChangingPrice(price);
    dispatch(chosenAction('change'));
  };
  const addHandler = () => {
    dispatch(chosenAction('add'));
  };
  const removeHandler = (id: string) => {
    setRemoveId(parseInt(id, 10));
    setIsShowRemoveModal(true);
  };
  return (
    <>
      <div className={style.nameContainer}>
        <AddIcon onClick={addHandler} />
        <p>Price Лист</p>
      </div>

      {action === 'change' && <PriceForm changingPrice={changingPrice} />}
      {action === 'add' && <PriceForm changingPrice={undefined} />}
      {action === 'show' &&
        (priceList?.length == 0 ? (
          <h3>Прайс-лист пуст</h3>
        ) : (
          priceList && <PriceTable data={priceList} edit={changeHandler} remove={removeHandler} />
        ))}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deletePrice(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
};

export default Price;
