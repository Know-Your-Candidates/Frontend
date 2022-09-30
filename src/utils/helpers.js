import { createStandaloneToast } from "@chakra-ui/toast";
const { toast } = createStandaloneToast();
import moment from "moment";
import "moment-timezone";

export const separateWithComma = (number) => {
  // Separate number with commas
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};

const getErrorMessage = (error) => {
  if (error.status == 400) {
    const errorKey = Object.keys(error?.data?.error)?.[0];
    const errorMessage = error?.data?.error?.[errorKey];

    return `${errorKey}: ${errorMessage}`;
  } else if (error.status == 401) {
    return error?.data?.error?.detail;
  } else if (error.status == 403) {
    return error?.data?.message;
  } else {
    return error?.data?.message || "Please try again later";
  }
};

export const toastError = (title, error, description, stay) => {
  // Trigger Chakra UI error toast
  toast({
    status: "error",
    title: title || "Error",
    description: description || getErrorMessage(error),
    duration: stay ? null : 4000,
    position: "top-right",
    variant: "top-accent",
  });
};

export const toastSuccess = (title, description, stay) => {
  // Trigger Chakra UI success toast
  toast({
    status: "success",
    title: title || "Successful!",
    description: description || "",
    duration: stay ? null : 4000,
    position: "top",
    variant: "top-accent",
  });
};
