import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExtraBookmark } from "../Store/Actions/UserActions";
import classes from "./HomepageContent.module.css";

const HomepageContent = (props) => {
  const username = useSelector((state) => state.user.username);
  const following = useSelector((state) => state.user.following);
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axios = require("axios");
  const dispatch = useDispatch();


  /* fetching the tweets that will then be show to the user */
  const fetchTweets = async () => {
    try {
      /* looping through your list of followers and then getting the data of those users */
      for (const user in following) {
        const response = await axios.get(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            following[user] +
            ".json"
        );
        /* setting the variables for the other users' name and img */
        const usernameOfPoster = following[user];
        const imgOfPoster = response.data.profileImg.profileImg;
        /* checking if the selected user has any posts to show */
        if (response.data.posts !== undefined) {
          /* looping through their posts */
          for (const post in response.data.posts) {
            /* setting the data to add */
            const tweetToAdd = {
              id: post,
              username: usernameOfPoster,
              img: imgOfPoster,
              message: response.data.posts[post].message,
              time: response.data.posts[post].time,
            };
            /* adding 'tweetToAdd' to the tweets state and ordering them at the same time */
            setTweets((prev) => {
              const toOrder = [...prev, tweetToAdd];
              toOrder.sort((a, b) => b.time - a.time);
              return toOrder;
            });
          }
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  /* loading the tweets on the first render and if a new tweet is posted from the <Tweets /> component */
  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, [props.refresher]);

  /* onClick of the 'addBookmark' button */
  const bookmarkHandler = async (tweetIdentity) => {
    /* checking if you havve any bookmarks to start with */
    if (bookmarks === undefined) {
      try {
        /* if you have no bookmarks it will just put the new bookmark  */
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            username +
            "/bookmarks.json",
          [tweetIdentity]
        );
        /* updating state with new changes */
        dispatch(addExtraBookmark(tweetIdentity));
      } catch (err) {
        console.log(err);
      }
    } else if (!bookmarks.includes(tweetIdentity)) {
      /* checks that you haven't already bookmarked this tweet then puts a new array */
      try {
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            username +
            "/bookmarks.json",
          [...bookmarks, tweetIdentity]
        );
        /* updating state with new changes */
        dispatch(addExtraBookmark(tweetIdentity));
      } catch (err) {
        console.log(err);
      }
    }
  };

  /* mapping the tweets to create the content to show you */
  const tweetsContent = tweets.map((tweet) => (
    <div key={tweet.id} className={classes.tweet}>
      <img src={tweet.img} className={classes.img} />
      <div className={classes.content}>
        <div className={classes.username}>{tweet.username}</div>
        <div className={classes.message}>{tweet.message}</div>
        <button
          className={classes.bookmark}
          onClick={() =>
            bookmarkHandler({ id: tweet.id, username: tweet.username })
          }
        >
          Bookmark
        </button>
      </div>
    </div>
  ));

  return (
    /* showing 'loading' or 'content' or 'no content' */
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
