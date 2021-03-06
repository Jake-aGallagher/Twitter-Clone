import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Store/Actions/UserActions";

import Modals from "./Modals";
import NavbarOption from "./NavbarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const username = useSelector((state) => state.user.username);
  const profileImg = useSelector((state) => state.user.profileImg);
  const [tweetModal, setTweetModal] = useState(false);
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()

  /* setting a boolean for the window size, to be used to conditionally render text by icons */
  const showText = props.windowSize >= 1300;

  /* removing user from state and logoutHandler takes you back to the login screen */
  const logoutHandler = () => {
    dispatch(removeUser())
    props.logoutHandler()
  }

  /* passed to <Modal /> so that it can be closed on background click */
  const closeModal = () => {
    setTweetModal(false);
  };

  return (
    /* this is the sidebar, each link gives props to a <NavbarOption /> where it uses the props to show the icons and text */
    <div className={showText ? classes.navbar : classes.smallNav}>
      <TwitterIcon
        className={showText ? classes.twitterIcon : classes.twitterIconSmall}
      />

      <Link href="/">
        <a>
          <NavbarOption
            Icon={HomeIcon}
            text="Home"
            active={router.pathname === "/"}
            showText={showText}
          />
        </a>
      </Link>
      <Link href="/explore">
        <a>
          <NavbarOption
            Icon={SearchIcon}
            text="Explore"
            active={router.pathname === "/explore"}
            showText={showText}
          />
        </a>
      </Link>
      <Link href="/notifications">
        <a>
          <NavbarOption
            Icon={NotificationsNoneIcon}
            text="Notifications"
            active={router.pathname === "/notifications"}
            showText={showText}
          />
        </a>
      </Link>
      <Link href="/messages">
        <a>
          <NavbarOption
            Icon={MailOutlineIcon}
            text="Messages"
            active={router.pathname === "/messages"}
            showText={showText}
          />
        </a>
      </Link>
      <Link href="/bookmarks">
        <a>
          <NavbarOption
            Icon={BookmarkBorderIcon}
            text="Bookmarks"
            active={router.pathname === "/bookmarks"}
            showText={showText}
          />
        </a>
      </Link>
      
      <Link href="/profile">
        <a>
          <NavbarOption
            Icon={PermIdentityIcon}
            text="Profile"
            active={router.pathname === "/profile"}
            showText={showText}
          />
        </a>
      </Link>
    {/* this button shows the tweet modal */}
      <button
        onClick={() => setTweetModal(!tweetModal)}
        className={showText ? classes.tweet : classes.tweetSmall}
      >
        {showText ? <p>Tweet</p> : <p>&#43;</p>}
      </button>

      {tweetModal && <Modals content="tweet" closeModal={closeModal} />}

      {/* this button shows the logout button */}
      <button
        className={classes.account}
        onClick={() => setShowLogoutBox(!showLogoutBox)}
      >
        <img src={profileImg} className={classes.accountCircleIcon} />
        {showText ? <p className={classes.accountText}>{username}</p> : ""}
      </button>
      {showLogoutBox && (
        <div className={classes.logoutBox} onClick={logoutHandler}>
          Logout
        </div>
      )}
    </div>
  );
};

export default Navbar;
