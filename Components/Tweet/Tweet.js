import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Tweet.module.css";

const Tweet = (props) => {
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);
  const [message, setMessage] = useState("");
  const axios = require("axios");

  const setMessageHandler = (event) => {
    setMessage(event.target.value);
  };

  const postTweetHandler = async () => {
    if (message.length > 0) {
      const response = await axios.post(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/posts.json",
        {
          message: message,
          time: Date.now(),
        }
      );
      setMessage("");
      if (props.closeModal !== undefined) {
        props.closeModal();
      }
      if (props.refreshHomepageHandler !== undefined) {
        props.refreshHomepageHandler();
      }
    } else {
      alert("Your Tweet must contain something!");
    }
  };

  return (
    <div className={classes.tweet}>
      <div className={classes.tweetTopLine}>
        <img src={profileImg} className={classes.tweetImg} />
        <textarea
          value={message}
          placeholder="What's happening"
          maxLength="140"
          onChange={setMessageHandler}
          className={classes.tweetInput}
        ></textarea>
      </div>
      <div className={classes.buttonFormating}>
        <button onClick={postTweetHandler} className={classes.tweetButton}>
          Tweet
        </button>
      </div>
    </div>
  );
};

export default Tweet;
