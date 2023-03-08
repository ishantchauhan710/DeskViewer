import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSessionDialog: false,
  userConnectionId: 0,
  remoteConnectionId: 0,
  sessionStartTime: 0,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setShowSessionDialog(state, action) {
      state.showSessionDialog = action.payload;
    },
    setUserConnectionId(state, action) {
      state.userConnectionId = action.payload;
    },
    setRemoteConnectionId(state, action) {
      state.remoteConnectionId = action.payload;
    },
    setSessionStartTime(state, action) {
      state.sessionStartTime = action.payload;
    },
  },
});

export const {
  setShowSessionDialog,
  setUserConnectionId,
  setRemoteConnectionId,
  setSessionStartTime,
} = connectionSlice.actions;
export default connectionSlice.reducer;
