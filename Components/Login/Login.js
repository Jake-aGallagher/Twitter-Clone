import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Store/Actions/UserActions";
import classes from "./Login.module.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [createdUsername, setCreatedUsername] = useState("");
  const [createdPassword, setCreatedPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const axios = require("axios");
  const dispatch = useDispatch();

  /* guest login logic 
  (this allows anyone to login as a guest with one click, 
  hopefully this will make it more likely that a recruiter will
  actually try the website instead of giving up at the login screen) */
  const guestLoginHandler = async () => {
    try {
      /* requesting the data of the Guest user account */
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/Guest.json"
      );
      /* setting the data to the redux store */
      dispatch(setUserData(response.data));
      /* removing the login screen */
      props.loginHandler();
      alert("welcome to the Guest account, \n please feel free to try out any functionalities that you wish")
    } catch (err) {
      alert("Something went wrong, Please try again");
      console.log(err);
    }
  };

  /* setting the page to Create Account page */
  const signUpPageHandler = () => {
    setSignup(true);
  };

  /* setting the page to the Login page */
  const loginPageHandler = () => {
    setSignup(false);
  };

  /* getting the data from the Login fields */
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  /* Login */
  const signInHandler = async (event) => {
    event.preventDefault();
    /* collecting the data based on the username that was input */
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          ".json"
      );
      /* checking if username matches, plaintext passwords are obviously not ideal but it's what I have to do without a proper back-end */
      if (response.data.password.password === password) {
        /* if password matches then set the state with the users data */
        dispatch(setUserData(response.data));
        /* removing the login screen and showing the site */
        props.loginHandler();
      } else {
        setPassword("");
        alert("Please enter a valid username and Password");
      }
    } catch (err) {
      alert("Something went wrong, Please try again");
      console.log(err);
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

  /* cleaing filled in fields when submit buttons are clicked */
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

  /* this request hecks for a user with this username already */
  const registerDatabaseCall = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          createdUsername +
          ".json"
      );
      /* checking that this username doesn't already exist */
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

  /* creating a random num for use with setting an image for a new user */
  const rand = Math.floor(Math.random() * 70 + 1);

  /* this is the object in the format that works with my database */
  const userDataToCreate = {
    password: { password: createdPassword },
    about: { about: "" },
    following: { 0: createdUsername },
    profileImg: { profileImg: "https://i.pravatar.cc/60?img=" + rand },
    username: createdUsername,
  };

  /* this request creates the account */
  const createUserAccountPostHandler = async () => {
    const response = await axios.put(
      "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
        createdUsername +
        ".json",
      userDataToCreate
    );
    clearCreatedFields();
    alert("Account created");
    setSignup(false);
  };

  return (
    <div className={classes.container}>
      <button className={classes.guestLogin} onClick={guestLoginHandler}>
        Guest Login
      </button>
      <div className={classes.page}>
        <div className={classes.topButtons}>
          <button onClick={signUpPageHandler}>Create Account</button>
          <button onClick={loginPageHandler}>Login</button>
        </div>
        {/* this is the login screen */}
        {!signup && (
          <form className={classes.loginForm}>
            <label htmlFor="username">Username: </label>
            <input type="text" onChange={usernameHandler} id="username"></input>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              onChange={passwordHandler}
              value={password}
              id="password"
            ></input>
            <button onClick={signInHandler}>Sign in</button>
          </form>
        )}

        {/* this is the create account screen */}
        {signup && (
          <form className={classes.createAccountForm}>
            <label htmlFor="createUsername">Create Username: </label>
            <input
              type="text"
              onChange={createdUsernameHandler}
              id="createUsername"
            ></input>
            <label htmlFor="createPassword">Create Password: </label>
            <input
              type="password"
              placeholder="Min 8 Characters"
              onChange={createdPasswordHandler}
              value={createdPassword}
              id="createPassword"
            ></input>
            <label htmlFor="retypePassword">Retype Password: </label>
            <input
              type="password"
              onChange={retypedPasswordHandler}
              value={retypedPassword}
              id="retypePassword"
            ></input>
            <button onClick={registerHandler}>register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
