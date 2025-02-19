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
      console.log(response.data.evaluations)
      return response.data.evaluations;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
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
      });
  },
});

export default evaluationSlice.reducer;
