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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from "@material-ui/core";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <TwitterIcon className={classes.twitterIcon} />

      <Link href="/">
        <a>
          <NavbarOption Icon={HomeIcon} text="Home" active={true} />
        </a>
      </Link>
      <Link href="/explore">
        <a>
          <NavbarOption Icon={SearchIcon} text="Explore" />
        </a>
      </Link>
      <Link href="/notifications">
        <a>
          <NavbarOption Icon={NotificationsNoneIcon} text="Notifications" />
        </a>
      </Link>
      <Link href="/messages">
        <a>
          <NavbarOption Icon={MailOutlineIcon} text="Messages" />
        </a>
      </Link>
      <Link href="/bookmarks">
        <a>
          <NavbarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        </a>
      </Link>
      <Link href="/lists">
        <a>
          <NavbarOption Icon={ListAltIcon} text="Lists" />
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <NavbarOption Icon={PermIdentityIcon} text="Profile" />
        </a>
      </Link>

      <button>
      <NavbarOption Icon={MoreHorizIcon} text="More" />
      </button>

      <Button variant="outlined" className={classes.tweet} fullWidth>
        Tweet
      </Button>

      <button>
      <AccountCircleIcon/>
      Username
      </button>
    </div>
  );
}

export default Navbar;
