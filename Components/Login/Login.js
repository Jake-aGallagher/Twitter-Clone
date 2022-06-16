import { useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProfileImg, addUser, setFollowing, setBookmarks } from "../Store/Actions/UserActions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [createdUsername, setCreatedUsername] = useState("");
  const [createdPassword, setCreatedPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const axios = require("axios");
  const dispatch = useDispatch()

  /* Setting the page to either the Login or Create Account page */
  const signUpPageHandler = () => {
    setSignup(true);
  };

  const loginPageHandler = () => {
    setSignup(false);
  };

  /* Getting the data from the Login fields */
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  /* Login */
  const signInHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          ".json"
      );
      if (response.data.password === password) {
        dispatch(addUser(username))
        dispatch(addProfileImg(response.data.profileImg))
        dispatch(setFollowing(response.data.following))
        dispatch(setBookmarks(response.data.bookmarks))
        props.loginHandler();
      } else {
        setPassword("");
        alert("Please enter a valid username and Password");
      }
    } catch (err) {
      alert("Something went wrong, Please try again");
      console.log(err)
    }
  };

  /* Getting data from the Create Account fields */
  const createdUsernameHandler = (event) => {
    setCreatedUsername(event.target.value);
  };

  const createdPasswordHandler = (event) => {
    setCreatedPassword(event.target.value);
  };

  const retypedPasswordHandler = (event) => {
    setRetypedPassword(event.target.value);
  };

  const clearCreatedFields = () => {
    setCreatedPassword("");
    setRetypedPassword("");
  };

  /* Create Account logic */
  const registerHandler = (event) => {
    event.preventDefault();
    if (createdUsername.length <= 0) {
      clearCreatedFields();
      alert("Please enter a valid username");
    } else if (createdPassword.length < 8) {
      clearCreatedFields();
      alert("Please enter a password of 8 characters or more");
    } else if (createdPassword !== retypedPassword) {
      clearCreatedFields();
      alert("Passwords did not match");
    } else {
      registerDatabaseCall();
      clearCreatedFields();
    }
  };

  const registerDatabaseCall = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          createdUsername +
          ".json"
      );
      if (response.data === null) {
        createUserAccountPostHandler();
      } else {
        alert("This Username already exists, please choose another");
        clearCreatedFields();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const rand = Math.floor((Math.random() * 70) + 1);

  const createUserAccountPostHandler = async () => {
    const response = await axios.put(
      "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
        createdUsername +
        ".json",
      { password: createdPassword,
        profileImg: "https://i.pravatar.cc/60?img="+ rand
      }
    );
    clearCreatedFields();
    alert("Account created");
    setSignup(false);
  };

  return (
    <div className={classes.page}>
        <div className={classes.topButtons}>
      <button onClick={signUpPageHandler}>Create Account</button>
      <button onClick={loginPageHandler}>Login</button>
      </div>
      {!signup && (
        <form className={classes.loginForm}>
          <input
            type="text"
            placeholder="Username"
            onChange={usernameHandler}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={password}
          ></input>
          <button onClick={signInHandler}>Sign in</button>
        </form>
      )}

      {signup && (
        <form className={classes.createAccountForm}>
          <input
            type="text"
            placeholder="Create Username"
            onChange={createdUsernameHandler}
          ></input>
          <input
            type="password"
            placeholder="Create Password"
            onChange={createdPasswordHandler}
            value={createdPassword}
          ></input>
          <input
            type="password"
            placeholder="Retype Password"
            onChange={retypedPasswordHandler}
            value={retypedPassword}
          ></input>
          <button onClick={registerHandler}>register</button>
        </form>
      )}
    </div>
  );
};

export default Login;
