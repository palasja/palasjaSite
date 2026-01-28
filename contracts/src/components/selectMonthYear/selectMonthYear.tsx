import { START_YEAR } from '../../helpers/constants';
import { MONTH_R } from '../../helpers/helper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getChosenOrganization } from '../../redux/slices/orgsSlice';
import {
  getChoosenMonth,
  chooseMonth,
  chooseYear,
  getChoosenYear,
} from '../../redux/slices/servicesSlice';

const SelectMonthYear = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenYear = useAppSelector(getChoosenYear);
  // const choosenOrg = useAppSelector(getChosenOrganization);
  const handlerChooseMonth = (month: string) => {
    dispatch(chooseMonth(month));
    // if (choosenOrg) {
    //   dispatch(chooseMonth(month));
    // }
  };
  const handlerChooseYear = (year: string) => {
    dispatch(chooseYear(year));
  };
  const yearCount = new Date().getFullYear() - START_YEAR + 1;
  return (
    <>
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
      <select onChange={(e) => handlerChooseYear(e.target.value)} defaultValue={choosenYear}>
        {[...new Array(yearCount)].map((_e, i) => {
          return (
            <option value={START_YEAR + i} key={i}>
              {START_YEAR + i}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectMonthYear;
