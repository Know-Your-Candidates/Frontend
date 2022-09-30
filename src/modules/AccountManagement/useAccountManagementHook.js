import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdmin,
  deleteAdmin,
  editAdmin,
  fetchAdmins,
} from "redux/slices/adminSlice";
import { toastError, toastSuccess } from "utils/helpers";

const initialAdminDetails = {
  name: "",
  email: "",
  password: "",
  account_type: "",
};

export default function useAccountManagementHook() {
  const [view, setView] = useState("grid");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [adminType, setAdminType] = useState("");
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [adminToEdit, setAdminToEdit] = useState(null);
  const [adminToAdd, setAdminToAdd] = useState(initialAdminDetails);
  const [hasAddedAdmin, setHasAddedAdmin] = useState(false);
  const { admins, loading } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const handleFetchAdmins = (overrides = {}) => {
    dispatch(
      fetchAdmins({
        is_superuser:
          adminType === "superadmin"
            ? true
            : adminType === "admin"
            ? false
            : undefined,
        is_staff: adminType === "staff" || undefined,
        verified: status === "pending" ? false : undefined,
        is_active: status !== "deleted",
        //  ? true : status === "deleted" ? false : undefined,
        name: query || undefined,
        ...overrides,
      })
    );
  };

  useEffect(() => {
    handleFetchAdmins();
  }, [status, adminType]);

  const debouncedOnChange = useCallback(
    debounce((value) => {
      handleFetchAdmins({ name: value });
    }, 300),
    []
  );

  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createAdmin(adminToAdd)).unwrap();

      setHasAddedAdmin(true);

      toastSuccess("Admin Created!");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleEditAdmin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        editAdmin({
          id: adminToEdit.id,
          payload: {
            ...adminToEdit,
            is_superuser: adminToEdit.account_type === "superuser",
          },
        })
      ).unwrap();
      toastSuccess("Updated successfully!");
      setAdminToEdit(null);
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const {} = await dispatch(deleteAdmin(adminToDelete.id)).unwrap();
      toastSuccess("Deleted successfully!");
      setAdminToDelete(null);
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    view,
    setView,
    status,
    setStatus,
    adminType,
    setAdminType,
    query,
    setQuery,
    debouncedOnChange,
    admins,
    adminToAdd,
    setAdminToAdd,
    handleAddAdmin,
    hasAddedAdmin,
    setHasAddedAdmin,
    adminToEdit,
    setAdminToEdit,
    handleEditAdmin,
    adminToDelete,
    setAdminToDelete,
    handleConfirmDelete,
    isLoading: loading === "FETCH_ADMINS",
    isAddingAdmin: loading === "CREATE_ADMIN",
    isDeletingAdmin: loading === "DELETE_ADMIN",
    isEditingAdmin: loading === "EDIT_ADMIN",
  };
}
