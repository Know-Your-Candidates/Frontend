import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/candidates/analytics/`, {
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

export const createAnalytic = createAsyncThunk(
  "analytics/createAnalytic",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/billing/analytic/new`,
        createPayload,
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

export const editAnalytic = createAsyncThunk(
  "analytics/editAnalytic",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/analytics/${editPayload.id}/`,
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

export const deleteAnalytic = createAsyncThunk(
  "analytics/deleteAnalytic",
  async (analyticId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(
        `${BASE_API_URL}/church/analytics/${analyticId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "kyc_acccess_token"
            )}`,
          },
        }
      );
      return analyticId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const analyticSlice = createSlice({
  name: "analytics",
  initialState: {
    analytics: null,
    loading: "FETCH_ANALYTICS",
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
    [fetchAnalytics.pending]: (state) => {
      state.analytics = null;
      delete state.error;
      delete state.success;
      state.loading = "FETCH_ANALYTICS";
    },
    [fetchAnalytics.fulfilled]: (state, action) => {
      state.success = "FETCH_ANALYTICS";
      state.analytics = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchAnalytics.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_ANALYTICS",
      };
      delete state.loading;
    },

    [createAnalytic.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_ANALYTIC";
    },
    [createAnalytic.fulfilled]: (state, action) => {
      state.success = "CREATE_ANALYTIC";
      state.analytics.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createAnalytic.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_ANALYTIC",
      };
      delete state.loading;
    },

    [editAnalytic.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_ANALYTIC";
    },
    [editAnalytic.fulfilled]: (state, action) => {
      state.success = "EDIT_ANALYTIC";
      const analytic = state.analytics.find(
        (analytic) => analytic.id === action.payload.id
      );
      // delete state.tempNote;
      Object.assign(analytic, action.payload);
      // state.analytics = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editAnalytic.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_ANALYTIC",
      };
      delete state.loading;
    },

    [deleteAnalytic.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_ANALYTIC";
      const position = state.analytics.findIndex(
        (analytic) => analytic.id === action.meta.arg
      );
      state.backupAnalytic = Object.assign({}, state.analytics[position]);
      state.backupPosition = position;
    },
    [deleteAnalytic.fulfilled]: (state) => {
      state.success = "DELETE_ANALYTIC";
      state.analytics.splice(state.backupPosition, 1);
      delete state.backupAnalytic;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteAnalytic.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_ANALYTIC",
      };
      delete state.backupPosition;
      delete state.backupAnalytic;
      delete state.loading;
    },
  },
});
export const { clearStates } = analyticSlice.actions;
export const analyticActions = analyticSlice.actions;
export default analyticSlice.reducer;
