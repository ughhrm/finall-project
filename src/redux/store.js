import { configureStore } from "@reduxjs/toolkit";
import  userLoginSlice  from "./slice/userLoginSlice";

export const store =configureStore({
    reducer:{
       userLogin :userLoginSlice

    }
})