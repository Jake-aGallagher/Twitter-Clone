import Layout from "../Components/Layout/Layout"
import Login from "../Components/Login/Login";
import "../styles/globals.css";
import { useEffect, useState } from "react"

const  MyApp = ({ Component, pageProps }) => {
  const [windowSize, setWindowSize] = useState(1300);
  const [loggedIn, SetLoggedIn] = useState(false)

  const loginHandler = () => {
    SetLoggedIn(true)
    console.log("loged in")
  }

  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
  }, []);
  

  return (
    <>
    {loggedIn && (<Layout windowSize={windowSize}>
      <Component {...pageProps} windowSize={windowSize} />
    </Layout> )}
    {!loggedIn && <Login loginHandler={loginHandler}/>}
    </>
  );
}

export default MyApp;
