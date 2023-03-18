import { configureStore } from "@reduxjs/toolkit";

import userinfoSlice from "./slices/userinfoSlice";

const store = configureStore({
    reducer: userinfoSlice
})

export default store;