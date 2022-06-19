import classes from "./ProfileWidget.module.css";
import { useSelector } from "react-redux";

const ProfileWidget = () => {
  const about = useSelector((state) => state.user.about);
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);

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
