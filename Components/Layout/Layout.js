import Navbar from "./Navbar.js";
import classes from "./Layout.module.css";
import { useState, useEffect } from "react";

const Layout = (props) => {
  const [windowSize, setWindowSize] = useState(1300);

  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
  }, []);

  return (
    <div className={classes.layout}>
      <Navbar windowSize={windowSize} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
