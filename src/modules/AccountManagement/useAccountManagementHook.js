import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "redux/slices/adminSlice";

export default function useAccountManagementHook() {
  const [view, setView] = useState("grid");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [adminType, setAdminType] = useState("");
  const [adminToDelete, setAdminToDelete] = useState(null);
  const { admins, loading } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const handleFetchAdmins = (overrides = {}) => {
    dispatch(
      fetchAdmins({
        is_superuser: adminType === "superadmin" || undefined,
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
    isLoading: loading === "FETCH_ADMINS",
    adminToDelete,
    setAdminToDelete,
  };
}
