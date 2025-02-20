import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvaluationsByGroupThunk = createAsyncThunk(
  "evaluations/getByGroup",
  async (group, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:5050/evaluations/get/group/${group}`,{
        headers: {
            Authorization: `Bearer ${token}`, 
          },

      });
      return response.data.evaluations;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
    }
  }
);

export const updateEvaluationThunk = createAsyncThunk(
  "evaluations/updateEvaluation",
  async ({ id, data }, { rejectWithValue, getState }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:5050/evaluations/score/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
    }
  }
);


export const updateAttendanceThunk = createAsyncThunk(
  "/updateAttendanceThunk",
  async ({ id, data }, { rejectWithValue, getState }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:5050/evaluations/attendance/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
    }
  }
);


 export const evaluationSlice = createSlice({
  name: "evaluations",
  initialState: {
    evaluations: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvaluationsByGroupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvaluationsByGroupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluations = action.payload;
      })
      .addCase(getEvaluationsByGroupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(updateEvaluationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvaluationThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEvaluation = action.payload;

        state.evaluations = state.evaluations.map((evaluation) =>
          evaluation._id === updatedEvaluation._id ? updatedEvaluation : evaluation
        );
      })
      .addCase(updateEvaluationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
   
  },
});

export default evaluationSlice.reducer;
