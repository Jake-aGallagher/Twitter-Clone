import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "../Components/Store/Actions/UserActions";
import classes from "../styles/bookmarks.module.css";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const username = useSelector((state) => state.user.username);
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = require("axios");
  const dispatch = useDispatch();

  const fetchBookmarks = async () => {
    if (bookmarks !== undefined) {
      try {
        const response = await axios.get(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        for (const bookmark in bookmarks) {
          const tweetToAdd = {
            id: bookmarks[bookmark].id,
            username: bookmarks[bookmark].username,
            img: response.data[bookmarks[bookmark].username].profileImg
              .profileImg,
            message:
              response.data[bookmarks[bookmark].username].posts[
                bookmarks[bookmark].id
              ].message,
            time: response.data[bookmarks[bookmark].username].posts[
              bookmarks[bookmark].id
            ].time,
          };
          setBookmarkedTweets((prev) => {
            const toOrder = [...prev, tweetToAdd];
            toOrder.sort((a, b) => b.time - a.time);
            return toOrder;
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  const deleteBookmarkHandler = async (tweetIdentity) => {
    const newBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== tweetIdentity.id
    );
    try {
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/bookmarks.json",
        [...newBookmarks]
      );
      dispatch(removeBookmark(newBookmarks));
    } catch (err) {
      console.log(err);
    }
  };

  const bookmarkContent = bookmarkedTweets.map((tweet) => (
    <div key={tweet.id} className={classes.item}>
      <img src={tweet.img} className={classes.img} />
      <div className={classes.content}>
        <div className={classes.username}>{tweet.username}</div>
        <div className={classes.message}>{tweet.message}</div>
        <button
          onClick={() =>
            deleteBookmarkHandler({ id: tweet.id, username: tweet.username })
          }
          className={classes.button}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    setLoading(true);
    setBookmarkedTweets([]);
    fetchBookmarks();
  }, [bookmarks]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Bookmarked Tweets</h1>
      {loading ? (
        <div>Loading...</div>
      ) : bookmarkContent.length > 0 ? (
        bookmarkContent
      ) : (
        <div>You have no Bookmarked Tweets</div>
      )}
    </div>
  );
};

export default Bookmarks;
