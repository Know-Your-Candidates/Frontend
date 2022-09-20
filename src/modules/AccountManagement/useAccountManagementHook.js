import React, { useState } from "react";

export default function useAccountManagementHook() {
  const [adminToDelete, setAdminToDelete] = useState(null);

  return { adminToDelete, setAdminToDelete };
}
