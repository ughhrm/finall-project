import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNotificationThunk =createAsyncThunk("/user/createNotificationThunk", async (notificationData, thunkAPI ) => {
        try {
            
            const response = await axios.post("http://localhost:5050/notification/send", notificationData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Müraciət göndərilmədi");
        }
    }                       

)
export const getAllNotifications = createAsyncThunk(
    "/getAllNotifications",
    async ( thunkAPI) => {
      try {
        const res = await axios.get("http://localhost:5050/notification/all-notifications");
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  )


const notificationSlice = createSlice({
    name: "notifications",
    initialState:{
        notifications:[],
        success: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotificationThunk.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            
            .addCase(createNotificationThunk.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(createNotificationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload; 
              })
              .addCase(getAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    },
});

export default notificationSlice.reducer;

