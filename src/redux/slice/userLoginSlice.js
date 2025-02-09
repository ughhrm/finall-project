import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const userLoginThunk = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5050/user/login", userData);
        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Login xətası");
    }
});

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        userLogin: null,  
        loading: false,   
        error: null,      
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginThunk.fulfilled, (state, action) => {
                state.userLogin = action.payload;  
                state.loading = false;
            })
            .addCase(userLoginThunk.pending, (state) => {
                state.loading = true;  
            })
            .addCase(userLoginThunk.rejected, (state, action) => {
                state.error = action.payload;  
                state.loading = false;
            });
    },
});

export default userLoginSlice.reducer;
