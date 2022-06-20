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
    .addCase(setUserData, (state, action) => {
      state.username = action.payload.username;
      state.profileImg = action.payload.profileImg.profileImg;
      state.following = action.payload.following;
      state.bookmarks = action.payload.bookmarks;
      state.about = action.payload.about.about;
    })
    .addCase(removeUser, (state) => {
      state.username = "";
      state.profileImg = "";
      state.following = [];
      state.bookmarks = [];
      state.about = "";
    })
    .addCase(removeBookmark, (state, action) => {
      state.bookmarks = action.payload;
    })
    .addCase(addExtraBookmark, (state, action) => {
      state.bookmarks = state.bookmarks.concat(action.payload);
    })
    .addCase(removeFollowing, (state, action) => {
      state.following = action.payload;
    })
    .addCase(addExtraFollowing, (state, action) => {
      state.following = state.following.concat(action.payload);
    })
    .addCase(changeAbout, (state, action) => {
      state.about = action.payload;
    })
    .addCase(changeImg, (state, action) => {
      state.profileImg = action.payload;
    });
});

export default userAccountReducer;
