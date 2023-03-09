import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSessionDialog: false,
  userConnectionId: null,
  remoteConnectionId: null,
  sessionStartTime: null,
  sessionMode: null, // 0 (Other's control your pc) | 1 (You control other's pc)
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
    setSessionMode(state, action) {
      state.sessionMode = action.payload;
    },
  },
});

export const {
  setShowSessionDialog,
  setUserConnectionId,
  setRemoteConnectionId,
  setSessionStartTime,
  setSessionMode,
} = connectionSlice.actions;
export default connectionSlice.reducer;
