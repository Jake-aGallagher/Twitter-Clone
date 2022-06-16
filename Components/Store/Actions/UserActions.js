import { createAction } from "@reduxjs/toolkit";

export const addUser = createAction("addUser");
export const addProfileImg = createAction("addProfileImg");
export const setFollowing = createAction("setFollowing");
export const removeUser = createAction("removeUser");
export const setBookmarks = createAction("setBookmarks");
export const removeBookmark = createAction("removeBookmark")
export const addExtraBookmark = createAction("addExtraBookmark")
export const addExtraFollowing = createAction("addExtraFollowing")
export const removeFollowing = createAction("removeFollowing")