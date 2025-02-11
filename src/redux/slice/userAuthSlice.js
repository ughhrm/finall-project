import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const userAuthLoginThunk = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5050/user/login", userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Backende qolsulmayib");
    }
});

export const userAuthSignUpThunk = createAsyncThunk("user/signup",async(userData)=>{
    const res = await axios.post("http://localhost:5050/user/singup",userData);
    return res.data
})
export const userAuthLogOutThunk = createAsyncThunk("/user/logOut/post", async () => {
    const res = await axios.post("http://localhost:5050/user/logout")
    return res.data
})
export const getUserAuthThunk = createAsyncThunk("/get/user", async () => {
    const res = await axios.get("http://localhost:5050/user/profile",{withCredentials:true})
    console.log(res.data)
    return res.data
})

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        userAuth: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userAuthLoginThunk.fulfilled, (state, action) => {
                state.userAuth = action.payload;
                state.loading = false;
            })
            .addCase(userAuthLoginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuthLoginThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(userAuthLogOutThunk.fulfilled, (state) => {
                state.userAuth = [];
                state.loading = false;
            })
            .addCase(userAuthLogOutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuthLogOutThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getUserAuthThunk.fulfilled, (state, action) => {
                state.userAuth = action.payload;
                state.loading = false;
            })
            .addCase(getUserAuthThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserAuthThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(userAuthSignUpThunk.fulfilled, (state, action)=>{
                state.userAuth =action.payload
            })
            .addCase(userAuthSignUpThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuthSignUpThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    },
});

export default userAuthSlice.reducer;
