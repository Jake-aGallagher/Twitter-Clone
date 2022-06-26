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
    /* checking if you have any bookmarks before fetching */
    if (bookmarks !== undefined) {
      try {
        const response = await axios.get(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        for (const bookmark in bookmarks) {
          /* sets details of the specific bookmared tweet */
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
          /* updates list of bookmarked tweets and orders them chronologically */
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

  /* onClick delete bookmark */
  const deleteBookmarkHandler = async (tweetIdentity) => {
    /* creates new array of bookmarks without the deleted one */
    const newBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== tweetIdentity.id
    );
    try {
      /* puts the new array */
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/bookmarks.json",
        [...newBookmarks]
      );
      /* updates the store */
      dispatch(removeBookmark(newBookmarks));
    } catch (err) {
      console.log(err);
    }
  };

  /* sets the bookmarks to show the user */
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

  /* fetch bookmarks on first render and when bookmarks changes (when a bookmard is removed) */
  useEffect(() => {
    setLoading(true);
    setBookmarkedTweets([]);
    fetchBookmarks();
  }, [bookmarks]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Bookmarked Tweets</h1>
      {/* sets 'loading' or 'bookmarks' or 'no bookmarks' */}
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
