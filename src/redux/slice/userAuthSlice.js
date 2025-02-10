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
export const userAuthLogOutThunk= createAsyncThunk("/user/logOut/post", async()=>{
    const res = await axios.post("http://localhost:5050/user/logout")
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
    },
});

export default userAuthSlice.reducer;
