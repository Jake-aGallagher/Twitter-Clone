import Tweet from "../Components/Tweet/Tweet";
import Widgets from "../Components/Widgets/Widgets";
import classes from "../styles/index.module.css"

const Feed = (props) => {
  const showWidgets = props.windowSize >= 1000;

  return (
    <div className={classes.page}>
    <div className={classes.content}>
      <Tweet />
      <div>
        content
      </div>
      </div>
      {showWidgets && <Widgets />}
    </div>
  );
};

export default Feed;
