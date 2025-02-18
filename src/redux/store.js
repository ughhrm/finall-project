import { configureStore } from "@reduxjs/toolkit";
import  userAuthSlice  from "./slice/userAuthSlice";
import  adminAuthSlice  from "./slice/adminAuthSlice";

export const store =configureStore({
    reducer:{
        userAuth :userAuthSlice,
        adminAuth:adminAuthSlice
    

    }
})