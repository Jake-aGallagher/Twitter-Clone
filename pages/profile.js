import { useSelector } from "react-redux";
import ProfileWidget from "../Components/ProfileComponents/ProfileWidget";
import ChangeAbout from "../Components/ProfileComponents/ChangeAbout";
import ChangeImg from "../Components/ProfileComponents/ChangeImg";
import ChangePassword from "../Components/ProfileComponents/ChangePassword";
import classes from "../styles/profile.module.css";

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
