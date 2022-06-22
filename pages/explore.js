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

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const keys = Object.keys(response.data);
      const matchingKeys = keys.filter((key) => key.includes(searchTerm));
      if (matchingKeys !== undefined) {
        for (const key in matchingKeys) {
          if (matchingKeys[key] !== username) {
            try {
              const res = await axios.get(
                "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
                  matchingKeys[key] +
                  ".json"
              );
              const profileToAdd = {
                id: matchingKeys[key],
                username: matchingKeys[key],
                img: res.data.profileImg.profileImg,
                about: res.data.about.about,
              };
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

  useEffect(() => {
    setProfiles([]);
    fetchResults();
  }, [searchTerm]);

  const addFollowingHandler = async (profileUsername) => {
    try {
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/following.json",
        [...following, profileUsername]
      );
      dispatch(addExtraFollowing(profileUsername));
    } catch (err) {
      console.log(err);
    }
  };

  const removeFollowingHandler = async (profileUsername) => {
    const newFollowingList = following.filter(
      (item) => item != profileUsername
    );
    try {
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/following.json",
        [...newFollowingList]
      );
      dispatch(removeFollowing(newFollowingList));
    } catch (err) {
      console.log(err);
    }
  };

  const profileContent = profiles.map((profile) => (
    <div key={profile.id} className={classes.profile}>
      <img src={profile.img} className={classes.img} />
      <div className={classes.content}>
        <div>{profile.username}</div>
        <div>{profile.about}</div>
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
