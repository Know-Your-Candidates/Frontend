import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchCsvs = createAsyncThunk(
  "csvs/fetchCsvs",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/candidates/files/`, {
        params: fetchPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kyc_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const createCsv = createAsyncThunk(
  "csvs/createCsv",
  async (formData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.post(`${BASE_API_URL}/candidates/files/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("kyc_acccess_token")}`,
        },
      });
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const editCsv = createAsyncThunk(
  "csvs/editCsv",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/csvs/${editPayload.id}/`,
        editPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "kyc_acccess_token"
            )}`,
          },
        }
      );
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const deleteCsv = createAsyncThunk(
  "csvs/deleteCsv",
  async (csvId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(`${BASE_API_URL}/candidates/files/${csvId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kyc_acccess_token")}`,
        },
      });
      return csvId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const csvSlice = createSlice({
  name: "csvs",
  initialState: {
    csvs: { results: [] },
    loading: "FETCH_CSVS",
    error: "",
    success: "",
  },
  reducers: {
    clearStates: (state, { payload }) => {
      delete state.loading;
      delete state.error;
      delete state.success;
    },
  },
  extraReducers: {
    [fetchCsvs.pending]: (state) => {
      state.csvs = { results: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_CSVS";
    },
    [fetchCsvs.fulfilled]: (state, action) => {
      state.success = "FETCH_CSVS";
      state.csvs = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchCsvs.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_CSVS",
      };
      delete state.loading;
    },

    [createCsv.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_CSV";
    },
    [createCsv.fulfilled]: (state, action) => {
      state.success = "CREATE_CSV";
      state.csvs.results.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createCsv.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_CSV",
      };
      delete state.loading;
    },

    [editCsv.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_CSV";
    },
    [editCsv.fulfilled]: (state, action) => {
      state.success = "EDIT_CSV";
      const csv = state.csvs.results.find(
        (csv) => csv.id === action.payload.id
      );
      // delete state.tempNote;
      Object.assign(csv, action.payload);
      // state.csvs.results = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editCsv.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_CSV",
      };
      delete state.loading;
    },

    [deleteCsv.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_CSV";
      const position = state.csvs.results.findIndex(
        (csv) => csv.id === action.meta.arg
      );
      state.backupCsv = Object.assign({}, state.csvs.results[position]);
      state.backupPosition = position;
    },
    [deleteCsv.fulfilled]: (state) => {
      state.success = "DELETE_CSV";
      state.csvs.results.splice(state.backupPosition, 1);
      delete state.backupCsv;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteCsv.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_CSV",
      };
      delete state.backupPosition;
      delete state.backupCsv;
      delete state.loading;
    },
  },
});
export const { clearStates } = csvSlice.actions;
export const csvActions = csvSlice.actions;
export default csvSlice.reducer;
