import { MONTH_R } from '../../helpers/helper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getChosenOrganization } from '../../redux/slices/orgsSlice';
import { getChoosenMonth, chooseMonth } from '../../redux/slices/servicesSlice';

const SelectMonth = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const handlerChooseMonth = (month: string) => {
    dispatch(chooseMonth(month));
    if (choosenOrg) {
      dispatch(chooseMonth(month));
    }
  };
  return (
    <select
      onChange={(e) => handlerChooseMonth(e.target.value)}
      defaultValue={choosenMonth}
      data-testid="monthSelect"
    >
      {MONTH_R.map((e, i) => {
        return (
          <option value={i} key={i}>
            {e}
          </option>
        );
      })}
    </select>
  );
};

export default SelectMonth;
