import classes from './Inputs.module.css';
import SingleInput from './SingleInput';

const Inputs = () => {
  return (
    <div className={classes['inputs-container']}>
      <SingleInput type="day" />
      <SingleInput type="month" />
      <SingleInput type="year" />
    </div>
  );
};

export default Inputs;
