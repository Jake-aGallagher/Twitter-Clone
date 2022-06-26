import Navbar from "./Navbar.js";
import classes from "./Layout.module.css";

const Layout = (props) => {
  /* makes the navbar a component that is present for every page */
  return (
    <div className={classes.layout}>
      <Navbar
        windowSize={props.windowSize}
        logoutHandler={props.logoutHandler}
      />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
