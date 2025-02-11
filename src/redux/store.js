import { configureStore } from "@reduxjs/toolkit";
import  userAuthSlice  from "./slice/userAuthSlice";

export const store =configureStore({
    reducer:{
        userAuth :userAuthSlice,

    }
})