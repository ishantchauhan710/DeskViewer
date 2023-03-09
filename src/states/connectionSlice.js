import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSessionDialog: false,
  userConnectionId: null,
  remoteConnectionId: null,
  sessionStartTime: null,
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
