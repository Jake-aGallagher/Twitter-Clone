import ProfileWidget from "../Components/ProfileComponents/ProfileWidget";
import ChangeAbout from "../Components/ProfileComponents/ChangeAbout";
import ChangeImg from "../Components/ProfileComponents/ChangeImg";
import ChangePassword from "../Components/ProfileComponents/ChangePassword";
import classes from "../styles/profile.module.css";

const Profile = () => {
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
