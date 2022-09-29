import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { BASE_API_URL } from "utils/constants";

export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (fetchPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${BASE_API_URL}/users/user-list/`, {
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

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (createPayload, thunkAPI) => {
    try {
      const { data } = await Axios.post(
        `${BASE_API_URL}/billing/admin/new`,
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

export const editAdmin = createAsyncThunk(
  "admins/editAdmin",
  async (editPayload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.put(
        `${BASE_API_URL}/church/admins/${editPayload.id}/`,
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

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (adminId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await Axios.delete(`${BASE_API_URL}/church/admins/${adminId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kyc_acccess_token")}`,
        },
      });
      return adminId;
    } catch ({ response }) {
      console.log(response);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: { results: [] },
    loading: "FETCH_ADMINS",
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
    [fetchAdmins.pending]: (state) => {
      state.admins = { results: [] };
      delete state.error;
      delete state.success;
      state.loading = "FETCH_ADMINS";
    },
    [fetchAdmins.fulfilled]: (state, action) => {
      state.success = "FETCH_ADMINS";
      state.admins = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchAdmins.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_ADMINS",
      };
      delete state.loading;
    },

    [createAdmin.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "CREATE_ADMIN";
    },
    [createAdmin.fulfilled]: (state, action) => {
      state.success = "CREATE_ADMIN";
      state.admins.push(action.payload);
      delete state.loading;
      delete state.error;
    },
    [createAdmin.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "CREATE_ADMIN",
      };
      delete state.loading;
    },

    [editAdmin.pending]: (state) => {
      delete state.error;
      delete state.success;
      state.loading = "EDIT_ADMIN";
    },
    [editAdmin.fulfilled]: (state, action) => {
      state.success = "EDIT_ADMIN";
      const admin = state.admins.find(
        (admin) => admin.id === action.payload.id
      );
      // delete state.tempNote;
      Object.assign(admin, action.payload);
      // state.admins = action.payload;
      delete state.loading;
      delete state.error;
    },
    [editAdmin.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "EDIT_ADMIN",
      };
      delete state.loading;
    },

    [deleteAdmin.pending]: (state, action) => {
      delete state.error;
      delete state.success;
      state.loading = "DELETE_ADMIN";
      const position = state.admins.findIndex(
        (admin) => admin.id === action.meta.arg
      );
      state.backupAdmin = Object.assign({}, state.admins[position]);
      state.backupPosition = position;
    },
    [deleteAdmin.fulfilled]: (state) => {
      state.success = "DELETE_ADMIN";
      state.admins.splice(state.backupPosition, 1);
      delete state.backupAdmin;
      delete state.backupPosition;
      delete state.loading;
      delete state.error;
    },
    [deleteAdmin.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_ADMIN",
      };
      delete state.backupPosition;
      delete state.backupAdmin;
      delete state.loading;
    },
  },
});
export const { clearStates } = adminSlice.actions;
export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
