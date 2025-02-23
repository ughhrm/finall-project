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

export const getEvaluationsByGroupforStudentThunk = createAsyncThunk(
  "/user/evaluations/getByGroup",
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

export const getStudentEvaluationsThunk = createAsyncThunk(
  "/getStudentEvaluations",
  async (studentId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");

          const response = await axios.get(`http://localhost:5050/evaluations/get/student/${studentId}`,{
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          console.log(response.data)
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
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

export const createEvaluationThunk = createAsyncThunk(
  "evaluations/createEvaluation",
  async ({ group, gradeDate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:5050/evaluations/create", { group, gradeDate },
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
    .addCase(getStudentEvaluationsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getStudentEvaluationsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.evaluations = action.payload; 
    })
    .addCase(getStudentEvaluationsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
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
      .addCase(getEvaluationsByGroupforStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvaluationsByGroupforStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluations = action.payload;
      })
      .addCase(getEvaluationsByGroupforStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(updateEvaluationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvaluationThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEval = action.payload.updatedEvaluation; 
      
        state.evaluations = state.evaluations.map((evaluation) =>
          evaluation._id === updatedEval._id
            ? { ...evaluation, score: updatedEval.score ?? evaluation.score }
            : evaluation
        );
      })
      .addCase(updateEvaluationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvaluationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvaluationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluations = [...state.evaluations, ...action.payload.evaluations];
      })
      .addCase(createEvaluationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAttendanceThunk.pending, (state) => {
        state.loading = true;
      })
    
      .addCase(updateAttendanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAttendanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEval = action.payload.updatedAttendance; 
      
        state.evaluations = state.evaluations.map((evalData) =>
          evalData._id === updatedEval._id
            ? { ...evalData, attendance: updatedEval.attendance ?? evalData.attendance } 
            : evalData
        );
      });
      
   
  },
});

export default evaluationSlice.reducer;
