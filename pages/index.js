import { useState } from "react";
import Tweet from "../Components/Tweet/Tweet";
import HomepageContent from "../Components/HomepageContent/HomepageContent";
import classes from "../styles/index.module.css";


const Feed = (props) => {
  const [refresher, setRefresher] = useState(0)

  const refreshHomepageHandler = () => {
    setRefresher((prev) => prev + 1)
  }


  return (
    <div className={classes.container}>
      <Tweet refreshHomepageHandler={refreshHomepageHandler}/>
      <HomepageContent refresher={refresher}/>
    </div>
  );
};

export default Feed;
