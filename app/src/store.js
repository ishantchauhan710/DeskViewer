import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./states/connectionSlice";

const store = configureStore({
  reducer: {
    connection: connectionSlice,
  },
});

export default store;