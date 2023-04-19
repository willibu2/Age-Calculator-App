import { useState, useContext } from 'react';
import classes from './SingleInput.module.css';
import ErrorMessage from './ErrorMessage';
import AgeContext from '@/store/AgeContext';

const SingleInput = ({ type }) => {
  const ctx = useContext(AgeContext);

  const [inputValue, setInputValue] = useState('');
  const [inputIsTouched, setInputIsTouched] = useState(false);

  let inputValidation;
  let placeholder;

  if (type === 'day') {
    inputValidation = (val) => val > 0 && val < 32;
    placeholder = 'DD';
  }

  if (type === 'month') {
    inputValidation = (val) => val > 0 && val < 13;
    placeholder = 'MM';
  }

  if (type === 'year') {
    inputValidation = (val) => val > 99 && val < 2024;
    placeholder = 'YY';
  }

  const inputIsValid = inputValidation(inputValue);
  const inputIsInvalid = !inputIsValid && inputIsTouched;

  const inputClasses = inputIsInvalid
    ? `${classes.input} ${classes.error}`
    : `${classes.input}`;

  const labelClasses = inputIsInvalid
    ? `${classes.label} ${classes.error}`
    : `${classes.label}`;

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);

    ctx.inputContextHandler(type, e.target.value);
  };
  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const label = type.toUpperCase();

  const inputIsEmpty = inputValue.trim().length === 0;

  return (
    <div>
      <label className={labelClasses}>{label}</label>
      <input
        type="number"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        placeholder={placeholder}
        className={inputClasses}
      />
      <ErrorMessage type={type} empty={inputIsEmpty} invalid={inputIsInvalid} />
      {type === 'day' &&
        !inputIsEmpty &&
        !inputIsInvalid &&
        ctx.ageState.touch &&
        !ctx.ageState.dateIsValid && <ErrorMessage invalidDate={true} />}
    </div>
  );
};

export default SingleInput;
