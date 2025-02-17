import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminSignUpThunk = createAsyncThunk("admin/signup", async (adminData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:5050/admin/signup", adminData);
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message||"Backende qosulmayib")
    }
})
export const adminLogInThunk = createAsyncThunk("aadmin/logon", async (adminData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:5050/admin/login", adminData);
        const { token } = res.data
        localStorage.setItem("token", token);
        return res.data

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "backende qosulmayib")
    }
})

export const signUpStudentandTeacherByAdminThunk = createAsyncThunk("student/teacher/signup",async(userData,thunkAPI)=>{
    
    try {
        const token = localStorage.getItem("token");
     const res = await axios.post("http://localhost:5050/admin/cerate-user",userData,{
        headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
     });
     return res.data
    } catch (error) {
     return thunkAPI.rejectWithValue(error.response?.data?.message)
     
    }
 })

export const adminSlice = createSlice({
    name: "adminAuth",
    initialState: {
        adminAuth: [],
        loading: false,
        error: null,
    },

    reducers: {
        resetError: (state) => {
            state.error = null; 
        },
    },


    extraReducers: builder => {
        builder
            .addCase(adminSignUpThunk.fulfilled, (state, action) => {
                state.adminAuth.push(action.payload)
                state.loading = false
            })
            .addCase(adminSignUpThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(adminSignUpThunk.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(adminLogInThunk.fulfilled, (state, action) => {
                state.userAuth = action.payload;
                state.loading = false;
            })
            .addCase(adminLogInThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminLogInThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(signUpStudentandTeacherByAdminThunk.fulfilled, (state, action) => {
                state.adminAuth.push(action.payload)
                state.loading = false
            })
            .addCase(signUpStudentandTeacherByAdminThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(signUpStudentandTeacherByAdminThunk.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { resetError } = adminSlice.actions;
export default adminSlice.reducer