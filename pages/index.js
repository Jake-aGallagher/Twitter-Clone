import Tweet from "../Components/Tweet/Tweet";
import Widgets from "../Components/Widgets/Widgets";
import classes from "../styles/index.module.css";

const Feed = (props) => {
  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <Tweet />
        <div>content</div>
      </div>
      {props.windowSize >= 1000 && <Widgets />}
    </div>
  );
};

export default Feed;
