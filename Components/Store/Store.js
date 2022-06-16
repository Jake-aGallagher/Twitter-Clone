import { configureStore } from "@reduxjs/toolkit";
import UserAccountReducer from "./UserAccountReducer";

const store = configureStore({
  reducer: { user: UserAccountReducer},
});

export default store;
