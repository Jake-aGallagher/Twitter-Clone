import classes from "../styles/profile.module.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const about = useSelector((state) => state.user.about);
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Profile</h1>
      <div className={classes.profile}>
        <img src={profileImg} className={classes.profileImg}/>
        <div className={classes.content}>
          <div className={classes.username}>{username}</div>
          <div className={classes.about}>{about}</div>
        </div>
      </div>

      <div className={classes.updatingSection}>

      </div>
    </div>
  );
};

export default Profile;
