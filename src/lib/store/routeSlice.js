import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routePrefix: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoutePrefix: (state, action) => {
      state.routePrefix = action.payload;
    },
  },
});

export const { setRoutePrefix } = routeSlice.actions;
export default routeSlice.reducer;
