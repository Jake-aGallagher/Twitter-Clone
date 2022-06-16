import Tweet from "../Components/Tweet/Tweet";
import HomepageContent from "../Components/HomepageContent/HomepageContent";
import classes from "../styles/index.module.css";

const Feed = (props) => {
  return (
    <div className={classes.container}>
      <Tweet />
      <HomepageContent />
    </div>
  );
};

export default Feed;
