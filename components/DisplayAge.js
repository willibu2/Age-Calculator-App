import classes from './DisplayAge.module.css';
import { useContext } from 'react';
import AgeContext from '@/store/AgeContext';

const DisplayAge = () => {
  const ctx = useContext(AgeContext);

  const years =
    ctx.ageState.dateIsValid && ctx.ageState.clicked
      ? ctx.ageState.years
      : '- -';
  const months =
    ctx.ageState.dateIsValid && ctx.ageState.clicked
      ? ctx.ageState.months
      : '- -';
  const days =
    ctx.ageState.dateIsValid && ctx.ageState.clicked
      ? ctx.ageState.days
      : '- -';

  return (
    <div className={classes.div}>
      <p className={classes.p}>
        <span>{years}</span> years
      </p>
      <p className={classes.p}>
        <span>{months}</span> months
      </p>
      <p className={classes.p}>
        <span>{days}</span> days
      </p>
    </div>
  );
};

export default DisplayAge;
