import { useSelector } from "react-redux";
import classes from "./ProfileWidget.module.css";

const ProfileWidget = () => {
  const about = useSelector((state) => state.user.about);
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);

  /* shows your current info in a widget at the top of the page */
  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <img src={profileImg} className={classes.profileImg} />
        <div className={classes.content}>
          <div className={classes.username}>{username}</div>
          <div className={classes.about}>{about}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;
