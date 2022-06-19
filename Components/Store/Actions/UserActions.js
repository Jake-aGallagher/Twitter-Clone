import { createAction } from "@reduxjs/toolkit";

export const setUserData = createAction("setUserData");
export const removeUser = createAction("removeUser")
export const removeBookmark = createAction("removeBookmark");
export const addExtraBookmark = createAction("addExtraBookmark");
export const removeFollowing = createAction("removeFollowing");
export const addExtraFollowing = createAction("addExtraFollowing");
export const changeAbout = createAction("changeAbout")
export const changeImg = createAction("changeImg")