import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/candidates/without-location/`, {
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

export const searchCandidates = createAsyncThunk(
  "candidates/searchCandidates",
  async (searchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/candidates/`, {
        params: searchPayload,
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

export const createCandidate = createAsyncThunk(
  "candidates/createCandidate",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/billing/candidate/new`,
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

export const editCandidate = createAsyncThunk(
  "candidates/editCandidate",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/candidates/${editPayload.id}/`,
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

export const deleteCandidate = createAsyncThunk(
  "candidates/deleteCandidate",
  async (candidateId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(
        `${BASE_API_URL}/church/candidates/${candidateId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "kyc_acccess_token"
            )}`,
          },
        }
      );
      return candidateId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: { results: [] },
    filterOptions: {},
    loading: "FETCH_CANDIDATES",
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
    [fetchCandidates.pending]: (state) => {
      state.candidates = { results: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_CANDIDATES";
    },
    [fetchCandidates.fulfilled]: (state, action) => {
      state.success = "FETCH_CANDIDATES";
      state.candidates = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchCandidates.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_CANDIDATES",
      };
      delete state.loading;
    },

    [createCandidate.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_CANDIDATE";
    },
    [createCandidate.fulfilled]: (state, action) => {
      state.success = "CREATE_CANDIDATE";
      state.candidates.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createCandidate.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_CANDIDATE",
      };
      delete state.loading;
    },

    [editCandidate.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_CANDIDATE";
    },
    [editCandidate.fulfilled]: (state, action) => {
      state.success = "EDIT_CANDIDATE";
      const candidate = state.candidates.find(
        (candidate) => candidate.id === action.payload.id
      );
      // delete state.tempNote;
      Object.assign(candidate, action.payload);
      // state.candidates = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editCandidate.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_CANDIDATE",
      };
      delete state.loading;
    },

    [deleteCandidate.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_CANDIDATE";
      const position = state.candidates.findIndex(
        (candidate) => candidate.id === action.meta.arg
      );
      state.backupCandidate = Object.assign({}, state.candidates[position]);
      state.backupPosition = position;
    },
    [deleteCandidate.fulfilled]: (state) => {
      state.success = "DELETE_CANDIDATE";
      state.candidates.splice(state.backupPosition, 1);
      delete state.backupCandidate;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteCandidate.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_CANDIDATE",
      };
      delete state.backupPosition;
      delete state.backupCandidate;
      delete state.loading;
    },
  },
});
export const { clearStates } = candidateSlice.actions;
export const candidateActions = candidateSlice.actions;
export default candidateSlice.reducer;
