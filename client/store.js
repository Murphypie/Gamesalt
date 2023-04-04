import { configureStore } from "@reduxjs/toolkit";

import userInfoSlice from "./slices/userInfoSlice";
import loggedStatusSlice from "./slices/loggedStatusSlice";

const store = configureStore({
    reducer:{
        userInfo: userInfoSlice,
        loggedStatus: loggedStatusSlice
    }
})

export default store;