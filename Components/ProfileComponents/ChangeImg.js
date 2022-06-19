import classes from "./ChangeImg.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeImg } from "../Store/Actions/UserActions";

const ChangeImg = () => {
  const [img, setImg] = useState("");
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const setImgHandler = (event) => {
    setImg(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (/https:\/\/[\S]*/.test(img)) {
      try {
        const response = await axios.put(
          "https://twitterclone-ad8de-default-rtdb.europe-west1.firebasedatabase.app/users/" +
            username +
            "/profileImg.json",
          { profileImg: img }
        );
        dispatch(changeImg(img))
        alert("Img updated");
        setImg("")
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(
        "Image address must start with 'https://' as uploading an image from a local file is not supported at the moment"
      );
    }
  };

  return (
    <form className={classes.form}>
      <label htmlFor="changeImg" className={classes.inputLabel}>
        Change Image
      </label>
      <input
        onChange={setImgHandler}
        className={classes.imgInput}
        value={img}
        placeholder="https:// ..."
      />
      <button onClick={submitHandler} className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ChangeImg;
