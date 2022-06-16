import { createReducer } from "@reduxjs/toolkit";
import {
  addUser,
  addProfileImg,
  setFollowing,
  removeUser,
  setBookmarks,
  removeBookmark,
  addExtraBookmark,
  addExtraFollowing,
  removeFollowing,
  setAbout
} from "./Actions/UserActions";

const initialState = {
  username: "",
  profileImg: "",
  following: [],
  bookmarks: [],
  about: ""
};

const userAccountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.username = action.payload;
    })
    .addCase(addProfileImg, (state, action) => {
      state.profileImg = action.payload;
    })
    .addCase(setFollowing, (state, action) => {
      state.following = action.payload;
    })
    .addCase(removeUser, (state) => {
      state.username = "";
    })
    .addCase(setBookmarks, (state, action) => {
      state.bookmarks = action.payload;
    })
    .addCase(removeBookmark, (state, action) => {
      state.bookmarks = action.payload
    })
    .addCase(addExtraBookmark, (state, action) => {
      state.bookmarks = state.bookmarks.concat(action.payload);
    })
    .addCase(addExtraFollowing, (state, action) => {
      state.following = state.following.concat(action.payload)
    })
    .addCase(removeFollowing, (state, action) => {
      state.following = action.payload
    })
    .addCase(setAbout, (state, action) => {
      state.about = action.payload
    })
});

export default userAccountReducer;
