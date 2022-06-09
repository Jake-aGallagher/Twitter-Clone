import axios from "axios";
import { useState } from "react"
import classes from "./Tweet.module.css"

const Tweet = () => {
  const [message, setMessage] = useState("")
  const username = "Jake"

  const setMessageHandler = (event) => {
    setMessage(event.target.value)
  }

  const postTweetHandler = async () => {
    const response = await axios.post(
      "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      {
        message: message,
        username: username,
      }
    );
    setMessage("")
  }

  return (
    <div className={classes.tweet}>
    <div className={classes.tweetTopLine}>
      <p className={classes.tweetImg}>IMG</p>
      <textarea value={message} placeholder="What's happening" maxLength="140" onChange={setMessageHandler} className={classes.tweetInput}></textarea>
    </div>
    <div className={classes.buttonFormating}>
  <button onClick={postTweetHandler} className={classes.tweetButton}>Tweet</button>
    </div>  
    </div>
  );
};

export default Tweet;
