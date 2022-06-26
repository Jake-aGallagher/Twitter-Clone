import { useEffect, useState } from "react";
import Head from 'next/head'
import { Provider } from "react-redux";
import store from "../Components/Store/Store";
import Layout from "../Components/Layout/Layout";
import Login from "../Components/Login/Login";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const [windowSize, setWindowSize] = useState();
  const [loggedIn, SetLoggedIn] = useState(false);

  /* romoving the login page */
  const loginHandler = () => {
    SetLoggedIn(true);
  };

  /* logut and show the login page  */
  const logoutHandler = () => {
    SetLoggedIn(false);
  };

  /* tracking the window size so that the navbar can be fully responsive */
  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
  }, []);

  /* provides all components with the redux store and surrounds all pages in the layout component */
  return (
    <>
    <Head>
        <title>Twitter-Clone Jake Gallagher</title>
        <meta name='description' content='This is a Twitter style app created by Jake Gallagher'/>
        <link rel="icon" href="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" />
      </Head>
    <Provider store={store}>
      {loggedIn && (
        <Layout windowSize={windowSize} logoutHandler={logoutHandler}>
          <Component {...pageProps} windowSize={windowSize} />
        </Layout>
      )}
      {!loggedIn && <Login loginHandler={loginHandler} />}
    </Provider>
    </>
  );
};

export default MyApp;
