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
      /* getting all chats */
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/chats.json"
      );

      for (const conversations in response.data) {
        /* selecting the only chat that belongs to both you and the user that you selected to chat with */
        if (
          response.data[conversations].users.includes(username) &&
          response.data[conversations].users.includes(props.data[0])
        ) {
          /* conversationNumber will be used to send a message to the right place later on */
          setConversationNumber(conversations);
          for (const item in response.data[conversations].messages) {
            const objToAdd = {
              user: response.data[conversations].messages[item].user,
              message: response.data[conversations].messages[item].message,
            };
            /* setting state for all the messages that you have sent each other */
            setMessages((prev) => [...prev, objToAdd]);
            /* numberOfMessages will be used later to send a new message to the right place */
            setNumberOfMessages(item);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* getting all the messages for this specific chat on rendering and when passed new props (user clicked a new chat in the parent component) */
  useEffect(() => {
    setMessages([]);
    fetchMessages();
  }, [props.data[0]]);

  /* setting all messages that have been sent to show depending on who it was sent by */
  const messagesToShow = messages.map((message) => (
    <div key={Math.random()} className={classes.theMessage}>
      {/* message that was sent by you (img will be on right) */}
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
      {/* above is a message that was sent by the other user (img will be on left) */}
    </div>
  ));

  /* setting the message to be sent */
  const textChangeHandler = (event) => {
    setSendingMessage(event.target.value);
  };

  /* onClick of send message button */
  const sendMessageHandler = async (event) => {
    event.preventDefault();
    /* check if there is actually a message to send */
    if (sendingMessage.length > 0) {
      try {
        /* puts a new message in the chat using the positioning saved in state earlier */
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
        /* refreshes the page, neccessary to get the right conversation and message number */
        fetchMessages();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={classes.outerContainer}>
      {/* showing messages if there are any or blank if no messages */}
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
