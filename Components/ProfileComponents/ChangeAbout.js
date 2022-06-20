import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAbout } from "../Store/Actions/UserActions";
import classes from "./ChangeAbout.module.css";

const ChangeAbout = () => {
  const username = useSelector((state) => state.user.username);
  const [about, setAbout] = useState("");
  const axios = require("axios");
  const dispatch = useDispatch();

  const setAboutHandler = (event) => {
    setAbout(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          "/about.json",
        { about: about }
      );
      dispatch(changeAbout(about));
      setAbout("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form}>
      <label htmlFor="changeBio" className={classes.inputLabel}>
        Change Bio
      </label>
      <textarea
        placeholder="Max Length 100 characters"
        maxLength="100"
        onChange={setAboutHandler}
        className={classes.aboutInput}
        value={about}
      ></textarea>
      <button onClick={submitHandler} className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ChangeAbout;
