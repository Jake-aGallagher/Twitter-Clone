import Link from "next/link";

import classes from "./Navbar.module.css";
import NavbarOption from "./NavbarOption";

import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();
  const showText = props.windowSize >= 1280;

  return (
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
      <Link href="/lists">
        <a>
          <NavbarOption
            Icon={ListAltIcon}
            text="Lists"
            active={router.pathname === "/lists"}
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

      <NavbarOption Icon={MoreHorizIcon} text="More" showText={showText} />

      <button  className={showText ? classes.tweet : classes.tweetSmall} >
        {showText ? <p>Tweet</p> : <p>&#43;</p>}
      </button>

      <button className={classes.account}>
        <AccountCircleIcon className={classes.accountCircleIcon} />
        {showText ? <p className={classes.accountText}>Username</p> : ""}
      </button>
    </div>
  );
};

export default Navbar;
