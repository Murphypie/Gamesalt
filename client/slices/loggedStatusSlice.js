import { createSlice } from '@reduxjs/toolkit';

export const loggedStatus = createSlice({
  name: 'loggedStatus',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    loggedInReducer: (state, action) => {
      //console.log('action.payload in loggedIn reducer', action.payload);
      state.loggedIn = action.payload;
    },
  },
});

// export actions
export const {
  loggedInReducer
} = loggedStatus.actions;

// export reducer
export default loggedStatus.reducer;
