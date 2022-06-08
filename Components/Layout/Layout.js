import Navbar from "./Navbar.js";
import classes from "./Layout.module.css";

const Layout = (props) => {


  return (
    <div className={classes.layout}>
      <Navbar windowSize={props.windowSize} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
