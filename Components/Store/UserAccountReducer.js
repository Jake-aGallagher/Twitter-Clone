import { createReducer } from "@reduxjs/toolkit";
import {
  setUserData,
  removeUser,
  removeBookmark,
  addExtraBookmark,
  addExtraFollowing,
  removeFollowing,
  changeAbout,
  changeImg,
} from "./Actions/UserActions";

const initialState = {
  username: "",
  profileImg: "",
  following: [],
  bookmarks: [],
  about: "",
};

const userAccountReducer = createReducer(initialState, (builder) => {
  builder
    /* called when user logs in */
    .addCase(setUserData, (state, action) => {
      state.username = action.payload.username;
      state.profileImg = action.payload.profileImg.profileImg;
      state.following = action.payload.following;
      state.about = action.payload.about.about;
      if (action.payload.bookmarks !== undefined) {
        state.bookmarks = action.payload.bookmarks;
      }
    })
    /* called when user logs out */
    .addCase(removeUser, (state) => {
      state.username = "";
      state.profileImg = "";
      state.following = [];
      state.bookmarks = [];
      state.about = "";
    })
    /* called when user removes a bookmark on the bookmarks page */
    .addCase(removeBookmark, (state, action) => {
      state.bookmarks = action.payload;
    })
    /* called when user adds another bookark on the homepage */
    .addCase(addExtraBookmark, (state, action) => {
      console.log(action.payload);
      state.bookmarks = state.bookmarks.concat(action.payload);
    })
    /* called when removing a follow on the explore page */
    .addCase(removeFollowing, (state, action) => {
      state.following = action.payload;
    })
    /* called when adding a follow on the explore page */
    .addCase(addExtraFollowing, (state, action) => {
      state.following = state.following.concat(action.payload);
    })
    /* called when changin your about on profile page */
    .addCase(changeAbout, (state, action) => {
      state.about = action.payload;
    })
    /* called when changing you img on profile page */
    .addCase(changeImg, (state, action) => {
      state.profileImg = action.payload;
    });
});

export default userAccountReducer;
