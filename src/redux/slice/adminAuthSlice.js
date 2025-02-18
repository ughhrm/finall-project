import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
 export const getAllUsersByAdminThunk = createAsyncThunk("AllUsersByAdmin",async(thunkAPI)=>{
 
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return thunkAPI.rejectWithValue("Token tapılmadı. Zəhmət olmasa yenidən daxil olun.");
        }
        const res = await axios.get("http://localhost:5050/admin/get-all-user",{
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "İstifadəçi məlumatı əldə olunmadı.");

        
    }
 })
 export const deleteUserByAdminThunk = createAsyncThunk(
    "admin/deleteUser",
    async (id,  thunkAPI ) => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`http://localhost:5050/admin/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
      }
    }
  );

// İstifadəçi məlumatlarını yeniləmək üçün Redux Thunk
export const updateUserByAdmin = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");

      const response = await axios.patch(`http://localhost:5050/admin/update-user/${id}`, userData, {
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
    }
  }
);




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
            .addCase(getAllUsersByAdminThunk.fulfilled, (state, action) => {
                state.adminAuth = action.payload;
                state.loading = false;
            })
            .addCase(getAllUsersByAdminThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsersByAdminThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteUserByAdminThunk.fulfilled, (state, action) => {
                state.adminAuth = state.adminAuth.filter(
                    (item) => item._id !== action.payload
                  );
            })
            .addCase(deleteUserByAdminThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserByAdminThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateUserByAdmin.pending, (state) => {
                state.loading = true;
              })
              .addCase(updateUserByAdmin.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload.updatedUser;
                
                state.adminAuth = state.adminAuth.map(user =>
                  user._id === updatedUser._id ? updatedUser : user
                );
              })
              .addCase(updateUserByAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    }
})

export const { resetError } = adminSlice.actions;
export default adminSlice.reducer