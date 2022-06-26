import classes from "./NavbarOption.module.css";

function NavbarOption({ text, Icon, active, showText }) {
  /* this component takes in the props from <Navbar /> and then sets what to render */
  return (
    <div
      className={`${showText ? classes.navbarOption : classes.navbarOptionSmall}  ${
        active && classes.navbarOptionActive
      }`}
    >
      <Icon />
      {showText && <h2>{text}</h2>}
      
    </div>
  );
}

export default NavbarOption;
