import classes from "../styles/notifications.module.css";

const Notifications = () => {
  /* notifications is not functional at this time */
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Notifications</h1>
      <p className={classes.notifications}>You have no notifications</p>
    </div>
  );
};

export default Notifications;
