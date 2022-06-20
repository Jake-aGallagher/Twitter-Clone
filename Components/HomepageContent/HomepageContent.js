import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExtraBookmark } from "../Store/Actions/UserActions";
import classes from "./HomepageContent.module.css";

const HomepageContent = () => {
  const username = useSelector((state) => state.user.username);
  const following = useSelector((state) => state.user.following);
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axios = require("axios");
  const dispatch = useDispatch();

  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      );
      for (const obj in response.data) {
        try {
          const tweetFound = await axios.get(
            "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
              obj +
              ".json"
          );
          if (following.includes(tweetFound.data.username)) {
            // Setting tweetToAdd out here is neccessary to prevent setTweets messing up the Id's
            const tweetToAdd = {
              id: obj,
              username: tweetFound.data.username,
              img: tweetFound.data.img,
              message: tweetFound.data.message,
            };
            setTweets((prev) => [...prev, tweetToAdd]);
          }
        } catch (err) {
          console.log(err);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, []);

  const bookmarkHandler = async (tweetIdentity) => {
    if (bookmarks === undefined) {
      try {
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            username +
            "/bookmarks.json",
          [tweetIdentity]
        );
        dispatch(addExtraBookmark(tweetIdentity));
      } catch (err) {
        console.log(err);
      }
    } else if (!bookmarks.includes(tweetIdentity)) {
      try {
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            username +
            "/bookmarks.json",
          [...bookmarks, tweetIdentity]
        );
        dispatch(addExtraBookmark(tweetIdentity));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const tweetsContent = tweets.map((tweet) => (
    <div key={tweet.id} className={classes.tweet}>
      <img src={tweet.img} className={classes.img} />
      <div className={classes.content}>
        <div className={classes.username}>{tweet.username}</div>
        <div className={classes.message}>{tweet.message}</div>
        <button
          className={classes.bookmark}
          onClick={() => bookmarkHandler(tweet.id)}
        >
          Bookmark
        </button>
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.text}>Loading...</div>
      ) : tweetsContent.length > 0 ? (
        tweetsContent
      ) : (
        <div className={classes.text}>
          You have no Tweets to view, follow more people to get involved.
        </div>
      )}
    </div>
  );
};

export default HomepageContent;
