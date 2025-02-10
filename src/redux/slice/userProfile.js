import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserThunk =createAsyncThunk("/get/user",async()=>{
    const res =await axios.get("http://localhost:5050/user/profile")
    return res.data
})


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],  
        loading: false,   
        error: null,      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;  
                state.loading = false;
            })
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;  
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.error = action.payload;  
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
