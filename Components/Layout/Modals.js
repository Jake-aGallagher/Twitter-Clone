import Tweet from "../Tweet/Tweet";
import classes from "./Modals.module.css";

const Modals = (props) => {
  /* this component is the modal that pops up when the tweet button in the navbar is selected */
  return (
    <div className={classes.container}>
      <div className={classes.background} onClick={props.closeModal}></div>
      <div className={classes.modal}>
        <Tweet closeModal={props.closeModal} />
      </div>
    </div>
  );
};

export default Modals;
