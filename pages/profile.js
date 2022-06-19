import classes from "../styles/profile.module.css";
import ProfileWidget from "../Components/ProfileComponents/ProfileWidget";
import ChangePassword from "../Components/ProfileComponents/ChangePassword";
import { useSelector } from "react-redux";
import ChangeAbout from "../Components/ProfileComponents/ChangeAbout";
import ChangeImg from "../Components/ProfileComponents/ChangeImg";

const Profile = () => {
  const about = useSelector((state) => state.user.about);
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Profile</h1>
      <ProfileWidget />
      <ChangeAbout />
      <ChangeImg />
      <ChangePassword />
    </div>
  );
};

export default Profile;
