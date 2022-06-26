import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MessageChat from "./MessageChat";

import classes from "./Chats.module.css";
import NewChatModal from "./NewChatModal";

const Chats = () => {
  const username = useSelector((state) => state.user.username);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatWidgets, setChatWidgets] = useState([]);
  const [messageProps, setMessageProps] = useState(["", ""]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [otherUsers, setOtherUsers] = useState([])
  const [newChatRefresh, setNewChatRefresh] = useState(0)
  const axios = require("axios");

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const findChats = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/.json"
      );
      for (const chat in response.data.chats) {
        if (response.data.chats[chat].users.includes(username)) {
          const otherUser = response.data.chats[chat].users.filter(
            (name) => name !== username
          );
          setOtherUsers((prev) => [...prev, ...otherUser])
          if (otherUser[0].includes(searchTerm) || searchTerm === "") {
            const chatToAdd = {
              id: chat,
              user: response.data.chats[chat].users.filter(
                (name) => name !== username
              ),
              profileImg:
                response.data.users[
                  response.data.chats[chat].users.filter(
                    (name) => name !== username
                  )
                ].profileImg.profileImg,
              lastMessage: response.data.chats[chat].messages.slice(-1),
            };
            // const newChatsArray = [...chatWidgets, chatToAdd];
            setChatWidgets((prev) => [...prev, chatToAdd]);
          }
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setChatWidgets([]);
    setOtherUsers([])
    setLoading(true);
    findChats();
  }, [searchTerm, newChatRefresh]);

  const chatSelectHandler = (user, img) => {
    setMessageProps([user, img]);
  };

  const newChatHandler = () => {
    setShowNewChatModal(true);
  };

  const chatsToShow = chatWidgets.map((chat) => (
    <div
      key={chat.id}
      className={classes.chat}
      onClick={() => chatSelectHandler(chat.user[0], chat.profileImg)}
    >
      <img src={chat.profileImg} className={classes.img} />
      <div className={classes.content}>
        <div className={classes.username}>{chat.user[0]}</div>
        <div className={classes.message}>{chat.lastMessage[0].message}</div>
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.findChatContainer}>
        <div className={classes.search}>
          <label htmlFor="searchBar">Search Chats</label>
          <input
            type="text"
            id="searchBar"
            placeholder="case sensitive"
            onChange={searchHandler}
          />
        </div>

        <button className={classes.newChatButton} onClick={newChatHandler}>
          Start New Chat
        </button>

        {loading ? (
          <div>Loading...</div>
        ) : chatsToShow.length > 0 ? (
          <div className={classes.chatsToShowContainer}>{chatsToShow}</div>
        ) : (
          <div>you have no chats to view</div>
        )}
      </div>
      <MessageChat data={messageProps} />
      {showNewChatModal && <NewChatModal setShowNewChatModal={setShowNewChatModal} otherUsers={otherUsers} setNewChatRefresh={setNewChatRefresh} />}
    </div>
  );
};

export default Chats;
