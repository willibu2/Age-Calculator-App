import Inputs from './Inputs/Inputs';
import classes from './Main.module.css';
import Button from './UI/Button';
import DisplayAge from './DisplayAge';

const Main = () => {
  return (
    <section className={classes.main}>
      <Inputs />
      <div className={classes['arrow-container']}>
        <div className={classes.line} />
        <Button />
      </div>
      <DisplayAge />
    </section>
  );
};

export default Main;
