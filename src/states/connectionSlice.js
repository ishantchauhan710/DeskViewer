import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSessionDialog: false,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setShowSessionDialog(state, action) {
      state.showSessionDialog = action.payload;
    },
  },
});

export const { setShowSessionDialog } = connectionSlice.actions;
export default connectionSlice.reducer;
