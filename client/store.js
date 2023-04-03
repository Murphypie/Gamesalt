import { configureStore } from "@reduxjs/toolkit";

import userInfoSlice from "./slices/userInfoSlice";

const store = configureStore({
    reducer:{
        userInfo: userInfoSlice,
    }
})

export default store;