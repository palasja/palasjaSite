import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Organization as Org } from '../helpers/contractTypes';
import style from './organization.module.css';
import { useIsUpdate } from '../hooks/useIsUpdate';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addOrg, chooseOrg, delOrg, editOrg, fetchOrgs, getAllOrganisation, getChosenOrganization, getOrganisationError } from '../features/orgs/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';

const Organization = () => {
  const { register, handleSubmit, setValue, reset } = useForm<Org>();
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(getAllOrganisation);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const errors = useAppSelector(getOrganisationError);
  const {btnValue, isUpdate, setIsUpdate} = useIsUpdate();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  
  const onSubmitCreate: SubmitHandler<Org> = (data) => {
    dispatch(addOrg(data));
    reset();
  };
  const onSubmitUpdate: SubmitHandler<Org> = (data) => {
    dispatch(editOrg(data));
    reset();
  };

  useEffect(() => {
    dispatch(fetchOrgs());
  }, []);
  return (
    <>
      <h2>Организации</h2>
      <h3>{errors}</h3>
      <form onSubmit={handleSubmit(isUpdate ? onSubmitUpdate : onSubmitCreate)}>
        {isUpdate ? <input id="id" type="hidden" {...register('id', { required: true })} /> : <></>}
        <div>
          <label htmlFor="name">Наименование Организации</label>
          <input id="name" {...register('name', { required: true })} />
        </div>

        <input type="submit" value={btnValue} />
      </form>
      <button
        onClick={() => {
          setIsUpdate(false);
          reset();
        }}
      >
        Очистить
      </button>
      <ul>
        {organizations.length == 0
          ? ''
          : organizations.map((org, i) => {
              return (
                <li key={i}>
                  <span
                    onClick={() => {  
                      dispatch(chooseOrg(org))
                    }}
                  >
                    {org.name}
                  </span>
                  <button
                    onClick={() => {
                      setRemoveId(org.id);
                      setIsShowRemoveModal(true);
                      }}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdate(true);
                      setValue('id', org.id);
                      setValue('name', org.name);
                    }}
                  >
                    Переименовать
                  </button>
                </li>
              );
            })}
      </ul>
      <h2>{choosenOrg?.name}</h2>
      {isShowRemoveModal && <RemoveAgreePortal remove={() => dispatch(delOrg(removeId))} hide={() => setIsShowRemoveModal(false)}/>}
    </>
  );
};

export default Organization;
