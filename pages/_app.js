import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../Components/Store/Store";
import Layout from "../Components/Layout/Layout";
import Login from "../Components/Login/Login";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const [windowSize, setWindowSize] = useState();
  const [loggedIn, SetLoggedIn] = useState(false);

  const loginHandler = () => {
    SetLoggedIn(true);
  };

  const logoutHandler = () => {
    SetLoggedIn(false);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
  }, []);

  return (
    <Provider store={store}>
      {loggedIn && (
        <Layout windowSize={windowSize} logoutHandler={logoutHandler}>
          <Component {...pageProps} windowSize={windowSize} />
        </Layout>
      )}
      {!loggedIn && <Login loginHandler={loginHandler} />}
    </Provider>
  );
};

export default MyApp;
