import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExtraFollowing,
  removeFollowing,
} from "../Components/Store/Actions/UserActions";
import classes from "../styles/explore.module.css";

const Explore = () => {
  const username = useSelector((state) => state.user.username);
  const following = useSelector((state) => state.user.following);
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const axios = require("axios");
  const dispatch = useDispatch();

  /* setting the search term from the input */
  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      /* grabs the username of each user */
      const keys = Object.keys(response.data);
      /* checks if the username includes the search term */
      const matchingKeys = keys.filter((key) => key.includes(searchTerm));
      if (matchingKeys !== undefined) {
        /* if there is at least one matching user */
        for (const key in matchingKeys) {
          if (matchingKeys[key] !== username) {
            try {
              const res = await axios.get(
                "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
                  matchingKeys[key] +
                  ".json"
              );
              /* finds the users details to add to state */
              const profileToAdd = {
                id: matchingKeys[key],
                username: matchingKeys[key],
                img: res.data.profileImg.profileImg,
                about: res.data.about.about,
              };
              /* sets state of profiles which match the search term */
              setProfiles((prev) => [...prev, profileToAdd]);
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* fetches profiles on first render and when the search term is updated */
  useEffect(() => {
    setProfiles([]);
    fetchResults();
  }, [searchTerm]);

  /* onClick follow */
  const addFollowingHandler = async (profileUsername) => {
    try {
      /* add this user to your follow list */
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/following.json",
        [...following, profileUsername]
      );
      /* update store with new follow */
      dispatch(addExtraFollowing(profileUsername));
    } catch (err) {
      console.log(err);
    }
  };

  /* onClick unfollow */
  const removeFollowingHandler = async (profileUsername) => {
    /* creates new array without the selected unfollow */
    const newFollowingList = following.filter(
      (item) => item != profileUsername
    );
    try {
      /* puts the new array */
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/following.json",
        [...newFollowingList]
      );
      /* update store with new array */
      dispatch(removeFollowing(newFollowingList));
    } catch (err) {
      console.log(err);
    }
  };

  /* setting what profiles to render */
  const profileContent = profiles.map((profile) => (
    <div key={profile.id} className={classes.profile}>
      <img src={profile.img} className={classes.img} />
      <div className={classes.content}>
        <div>{profile.username}</div>
        <div>{profile.about}</div>
        {/* showing a follow or unfollow button */}
        {!following.includes(profile.username) ? (
          <button
            className={classes.button}
            onClick={() => addFollowingHandler(profile.username)}
          >
            Follow
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => removeFollowingHandler(profile.username)}
          >
            Unfollow
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Search for Users</h1>
      <input
        type="text"
        placeholder="Search (case sensitive)"
        onChange={searchHandler}
        className={classes.input}
      ></input>

      <div className={classes.profileContainer}>{profileContent}</div>
    </div>
  );
};

export default Explore;
