import classes from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
  const { invalid, empty, type, invalidDate } = props;

  if (invalidDate) {
    return <p className={classes.error}>Please enter valid date!</p>;
  }

  if (!invalid) {
    return;
  }
  if (empty) {
    return <p className={classes.error}>This field is required</p>;
  }

  return <p className={classes.error}>Must be a valid {type}</p>;
};

export default ErrorMessage;
