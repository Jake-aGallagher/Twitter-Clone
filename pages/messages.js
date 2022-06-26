import Chats from "../Components/Messages/Chats";
import classes from "../styles/messages.module.css";

const Messages = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Messages</h1>
      <div className={classes.content}>
        <Chats />
      </div>
    </div>
  );
};

export default Messages;
 