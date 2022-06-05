import classes from "./NavbarOption.module.css";

function NavbarOption({ text, Icon, active }) {
  return (
    <div
      className={`${classes.navbarOption}  ${
        active && classes.navbarOptionActive
      }`}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default NavbarOption;
