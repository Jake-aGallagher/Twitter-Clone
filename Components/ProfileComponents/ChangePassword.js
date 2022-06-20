import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ChangePassword.module.css";

const ChangePassword = () => {
  const username = useSelector((state) => state.user.username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const axios = require("axios");

  const oldHandler = (event) => {
    setOldPassword(event.target.value);
  };

  const newHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const retypedHandler = (event) => {
    setRetypedPassword(event.target.value);
  };

  const clearFormHandler = () => {
    setOldPassword("");
    setNewPassword("");
    setRetypedPassword("");
  };

  const APIcallHandler = async () => {
    try {
      const response = await axios.get(
        "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          username +
          ".json"
      );
      if (response.data.password.password === oldPassword) {
        try {
          const res = await axios.put(
            "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
              username +
              "/password.json",
            { password: newPassword }
          );
          alert("Your password has been changed successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (newPassword !== retypedPassword) {
      clearFormHandler();
      alert("Passwords Must Match");
    } else if (newPassword.length < 8) {
      clearFormHandler();
      alert("New Password must be at least 8 characters long");
    } else {
      APIcallHandler();
    }
  };

  return (
    <div className={classes.updatingSection}>
      <form className={classes.changePassword}>
        <h2 className={classes.changePasswordTitle}>Change Password</h2>
        <div className={classes.passwordInputs}>
          <label htmlFor="oldPassword" className={classes.label}>
            Old Password:{" "}
          </label>
          <input
            type="password"
            id="oldPassword"
            onChange={oldHandler}
            value={oldPassword}
            className={classes.inputBox}
          />
        </div>
        <div className={classes.passwordInputs}>
          <label htmlFor="newPassword" className={classes.label}>
            New Password:{" "}
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Min 8 Characters"
            onChange={newHandler}
            value={newPassword}
            className={classes.inputBox}
          />
        </div>
        <div className={classes.passwordInputs}>
          <label htmlFor="retypeNewPassword" className={classes.label}>
            Retype New Password:{" "}
          </label>
          <input
            type="password"
            id="retypeNewPassword"
            onChange={retypedHandler}
            value={retypedPassword}
            className={classes.inputBox}
          />
        </div>
        <button onClick={submitHandler} className={classes.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
