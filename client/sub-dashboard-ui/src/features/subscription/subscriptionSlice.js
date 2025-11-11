import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlan: null,
  allSubscriptions: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    setAllSubscriptions: (state, action) => {
      state.allSubscriptions = action.payload;
    },
  },
});

export const { setCurrentPlan, setAllSubscriptions } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
