import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./NewChatModal.module.css";

const NewChatModal = (props) => {
  const username = useSelector((state) => state.user.username);
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const axios = require("axios");

  /* sets name of who you are searching for */
  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      for (const user in response.data) {
        if (
          /* shows all users other than ones you already have a chat with, yourself and any users that are not in your search term */
          !props.otherUsers.includes(response.data[user].username) &&
          response.data[user].username !== username &&
          response.data[user].username.includes(searchTerm)
        ) {
          const profileToAdd = {
            id: response.data[user].username,
            username: response.data[user].username,
            img: response.data[user].profileImg.profileImg,
            about: response.data[user].about.about,
          };
          /* setting all profiles that you should be shown */
          setProfiles((prev) => [...prev, profileToAdd]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* fetches profiles and re-renders when the search term changes */
  useEffect(() => {
    setProfiles([]);
    fetchResults();
  }, [searchTerm]);

  /* onClick of someone you want to chat with */
  const startChatHandler = async (theirUsername) => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/chats.json"
      );
      /* used to set the conversation number in the database */
      const numOfChats = response.data.length;
      try {
        const res = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/chats/" +
            numOfChats +
            ".json",
          {
            users: [username, theirUsername],
            messages: [{ message: "Hello", user: username }],
          }
        );
        /* closes the modal and refreshes your chats section */
        props.setShowNewChatModal(false);
        props.setNewChatRefresh((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* profiles to render */
  const profilesToShow = profiles.map((profile) => (
    <div key={profile.id} className={classes.profile}>
      <img src={profile.img} className={classes.img} />
      <div className={classes.content}>
        <div>{profile.username}</div>
        <div>{profile.about}</div>
        <button
          className={classes.button}
          onClick={() => startChatHandler(profile.username)}
        >
          Start Chat
        </button>
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      {/* background click closes modal */}
      <div
        className={classes.background}
        onClick={() => props.setShowNewChatModal(false)}
      ></div>
      <div className={classes.modal}>
        <div className={classes.search}>
          {/* search bar for starting a chat */}
          <h1 className={classes.title}>Search for Users</h1>
          <input
            type="text"
            placeholder="Search (case sensitive)"
            onChange={searchHandler}
            className={classes.input}
          ></input>
        </div>
        <div className={classes.profileContainer}>{profilesToShow}</div>
      </div>
    </div>
  );
};

export default NewChatModal;
