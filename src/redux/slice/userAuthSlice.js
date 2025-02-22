import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:5050/user";

export const changePassword = createAsyncThunk(
    "password/changePassword",
    async ({ email, oldPassword, newPassword }, { rejectWithValue }) => {
      try {
        const response = await axios.put("http://localhost:5050/user/change-password", {
          email,
          oldPassword,
          newPassword,
        });
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
      }
    }
  );

export const userAuthLoginThunk = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { token } = response.data;
        console.log(token)
        localStorage.setItem("token", token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Backende qoşulmadı");
    }
});

export const userAuthSignUpThunk = createAsyncThunk("user/signup",async(userData,thunkAPI)=>{
    
   try {
    const res = await axios.post("http://localhost:5050/user/singup",userData);
    return res.data
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
    
   }
})
export const userAuthLogOutThunk = createAsyncThunk("user/logout", async () => {
    await axios.post("http://localhost:5050/user/logout", {}, { withCredentials: true });
    localStorage.removeItem("token");
});
export const getUserAuthThunk = createAsyncThunk("user/get", async ( thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token lokal saxlama:", token); 

        if (!token) {
            return thunkAPI.rejectWithValue("Token tapılmadı. Zəhmət olmasa yenidən daxil olun.");
        }

        const res = await axios.get("http://localhost:5050/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        console.log(res.data)
        return res.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "İstifadəçi məlumatı əldə olunmadı.");
    }
});




export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        userAuth: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null; 
        },
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
                state.loading = false;

            })
            .addCase(userAuthSignUpThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuthSignUpThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
     
    },
});


export const { resetError } = userAuthSlice.actions;
export default userAuthSlice.reducer;
