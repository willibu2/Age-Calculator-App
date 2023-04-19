import AgeContext from './AgeContext';
import { useReducer } from 'react';

const validationLogic = (day, month, year) => {
  console.log(day > 0);

  if (
    day < 0 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year > 2023 ||
    year < 100
  ) {
    return false;
  }

  if (month == 2 || month == 4 || month == 6 || month == 9 || month == 11) {
    if (day == 31) {
      return false;
    }
  }

  return true;
};

const initialState = {
  dayInput: '',
  monthInput: '',
  yearInput: '',
  years: '',
  months: '',
  days: '',
  dateIsValid: false,
  clicked: false,
  touch: false,
};

const calculatingYearLogic = (year, month, day, variable) => {
  const todayDate = new Date();
  const todayDateMs = Date.now();

  const dob = new Date(year, month, day);
  const dobms = dob.getTime();

  const differenceMs = todayDateMs - dobms;
  const differenceDate = new Date(differenceMs);

  let years = differenceDate.getUTCFullYear() - 1970;

  let months = todayDate.getMonth() - dob.getMonth();
  let days = todayDate.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days = 30 + days;
  }

  if (months < 0) {
    months = 12 + months;
  }

  // if (year && month && day) {
  //   return years;
  // }
  if (variable == 'y') {
    return years;
  }

  if (variable == 'm') {
    return months;
  }

  if (variable == 'd') {
    return days;
  }
};

const calculatingMonthLogic = (year, month, day) => {
  const dob = new Date(year, month, day);

  const dobMonth = dob.getMonth();
};

const cartReducer = (state, action) => {
  if (action.type === 'day') {
    return {
      ...state,
      dayInput: action.value,
      dateIsValid: validationLogic(
        action.value,
        state.monthInput,
        state.yearInput
      ),
      clicked: false,
      touch: false,
    };
  }

  if (action.type === 'month') {
    return {
      ...state,
      monthInput: action.value,
      dateIsValid: validationLogic(
        state.dayInput,
        action.value,
        state.yearInput
      ),
      clicked: false,
      touch: false,
    };
  }

  if (action.type === 'year') {
    return {
      ...state,
      yearInput: action.value,
      dateIsValid: validationLogic(
        state.dayInput,
        state.monthInput,
        action.value
      ),
      clicked: false,
      touch: false,
    };
  }

  if (action.type === 'CLICK' && state.dateIsValid) {
    return {
      ...state,
      clicked: true,
      years: calculatingYearLogic(
        state.yearInput,
        state.monthInput - 1,
        state.dayInput,
        'y'
      ),
      months: calculatingYearLogic(
        state.yearInput,
        state.monthInput - 1,
        state.dayInput,
        'm'
      ),
      days: calculatingYearLogic(
        state.yearInput,
        state.monthInput - 1,
        state.dayInput,
        'd'
      ),
      touch: false,
    };
  }

  if (action.type === 'TOUCH') {
    return { ...state, touch: true };
  }

  return initialState;
};

const AgeContextProvider = (props) => {
  const [ageState, dispatchAction] = useReducer(cartReducer, initialState);

  const inputContextHandler = (type, value) => {
    dispatchAction({ type: type, value: value });
  };

  const btnClickHandler = () => {
    if (ageState.dateIsValid) {
      dispatchAction({ type: 'CLICK' });
    }

    dispatchAction({ type: 'TOUCH' });
  };

  // const dateIsValid = validationLogic(
  //   ageState.dayInput,
  //   ageState.monthInput,
  //   ageState.yearInput
  // );

  const ctxData = {
    inputContextHandler,
    ageState,
    btnClickHandler,
  };

  console.log(ageState);

  return (
    <AgeContext.Provider value={ctxData}>{props.children}</AgeContext.Provider>
  );
};

export default AgeContextProvider;
