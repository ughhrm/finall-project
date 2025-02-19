import { configureStore } from "@reduxjs/toolkit";
import  userAuthSlice  from "./slice/userAuthSlice";
import  adminAuthSlice  from "./slice/adminAuthSlice";
import  evaluationSlice from "./slice/evaluationSlice";

export const store =configureStore({
    reducer:{
        userAuth :userAuthSlice,
        adminAuth:adminAuthSlice,
        evaluations:evaluationSlice
    

    }
})