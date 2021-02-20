import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    type: "light",
    isDark: false,
    theme: {},
  },
  reducers: {
    toggleTheme(state, action) {
      switch (state.type) {
        case "light":
          return (state = { type: "dark", isDark: true });
        case "dark":
          return (state = { type: "light", isDark: false });
        default:
          return (state = { type: "light", isDark: false });
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
