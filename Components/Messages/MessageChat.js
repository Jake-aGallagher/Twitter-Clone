import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./MessageChat.module.css";

const MessageChat = (props) => {
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState("");
  const [conversationnumber, setConversationNumber] = useState();
  const [numberOfMessages, setNumberOfMessages] = useState(-1);
  const axios = require("axios");

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/chats.json"
      );

      for (const conversations in response.data) {
        if (
          response.data[conversations].users.includes(username) &&
          response.data[conversations].users.includes(props.data[0])
        ) {
          setConversationNumber(conversations);
          for (const item in response.data[conversations].messages) {
            // console.log("item: ", response.data[conversations].messages[item])
            const objToAdd = {
              user: response.data[conversations].messages[item].user,
              message: response.data[conversations].messages[item].message,
            };
            setMessages((prev) => [...prev, objToAdd]);
            setNumberOfMessages(item);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setMessages([]);
    fetchMessages();
  }, [props.data[0]]);

  const messagesToShow = messages.map((message) => (
    <div key={Math.random()} className={classes.theMessage}>
      {message.user === username ? (
        <div className={classes.messageItemsRight}>
          <div className={classes.myContent}>
            <div className={classes.myUser}>{message.user}</div>
            <div className={classes.myMessage}>{message.message}</div>
          </div>
          <img src={profileImg} className={classes.img} />
        </div>
      ) : (
        <div className={classes.messageItems}>
          <img src={props.data[1]} className={classes.img} />
          <div className={classes.theirContent}>
            <div className={classes.theirUser}>{message.user}</div>
            <div className={classes.theirMessage}>{message.message}</div>
          </div>
        </div>
      )}
    </div>
  ));

  const textChangeHandler = (event) => {
    setSendingMessage(event.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    if (sendingMessage.length > 0) {
      try {
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/chats/" +
            conversationnumber +
            "/messages/" +
            (Number(numberOfMessages) + 1) +
            ".json",
          {
            message: sendingMessage,
            user: username,
          }
        );
        setSendingMessage("");
        setMessages([]);
        fetchMessages();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={classes.outerContainer}>
      {props.data[0] !== "" ? (
        <div className={classes.container}>
          <div className={classes.messagingNow}>
            <img src={props.data[1]} />
            <h2>{props.data[0]}</h2>
          </div>
          {messagesToShow}
          <div className={classes.sendMessage}>
            <textarea
              onChange={textChangeHandler}
              value={sendingMessage}
            ></textarea>
            <button onClick={sendMessageHandler}>Send</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageChat;
