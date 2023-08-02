import { createSlice } from '@reduxjs/toolkit';

//selectors
export const getViewportMode = (state) => state.viewportMode;

const viewportModeSlice = createSlice({
  name: 'viewportMode',
  initialState: 1,
  reducers: {
    toggleViewportmode(state, action) {
      return action.payload <= 768
        ? 1
        : action.payload <= 992
        ? 2
        : action.payload <= 1400
        ? 3
        : 4;
    },
  },
});

export const { toggleViewportmode } = viewportModeSlice.actions;
export const viewportModeReducer = viewportModeSlice.reducer;
