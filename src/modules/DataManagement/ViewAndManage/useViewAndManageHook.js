import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCsv, deleteCsv, fetchCsvs } from "redux/slices/csvSlice";
import { toastError, toastSuccess } from "utils/helpers";

export default function useViewAndManageHook() {
  const [year, setYear] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [csvToDelete, setCsvToDelete] = useState(null);

  const dispatch = useDispatch();
  const { csvs, loading } = useSelector((state) => state.csvs);

  useEffect(() => {
    dispatch(fetchCsvs());
  }, []);

  const handleUploadCSV = (event) => {
    const csvFile = event.target.files[0];
    if (!csvFile) {
      return;
    }

    const csvSizeInMB = csvFile.size / 1024 / 1024;

    if (csvSizeInMB > 5) {
      toastError("Please upload a file that is less than 5MB", null, " ");
      return;
    }

    setFileToUpload(csvFile);
    // event.target.value = "";
  };

  const handleSubmitCSV = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // append the details of the form data
    formData.append("year", year);
    // append the file
    formData.append("file", fileToUpload);

    try {
      await dispatch(createCsv(formData)).unwrap();
      toastSuccess("CSV uploaded successfully");
      setFileToUpload(null);
      setYear("");
    } catch (error) {
      toastError(null, error);
    }
  };

  const handleConfirmCSVDelete = async () => {
    try {
      const {} = await dispatch(deleteCsv(csvToDelete.id)).unwrap();
      toastSuccess("Deleted successfully!");
      setCsvToDelete(null);
    } catch (error) {
      toastError(null, error);
    }
  };

  return {
    year,
    setYear,
    fileToUpload,
    setFileToUpload,
    handleUploadCSV,
    handleSubmitCSV,
    csvs,
    csvToDelete,
    setCsvToDelete,
    handleConfirmCSVDelete,
    isLoading: loading === "FETCH_CSVS",
    isUploadingCSV: loading === "CREATE_CSV",
    isDeletingCSV: loading === "DELETE_CSV",
  };
}
