import PageLoadingAnimation from "components/PageLoadingAnimation/PageLoadingAnimation";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStates, fetchUserDetails } from "../redux/slices/userSlice";

export const withAuth = (Component) => {
  return function Auth(props) {
    const dispatch = useDispatch();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { userDetails, error } = useSelector((state) => state.user);

    useEffect(() => {
      // Show desired page as soon as userDetails have been loaded to the redux store
      userDetails && setIsAuthorized(true);
    }, [userDetails]);

    useEffect(() => {
      if (error && error.errorType === "FETCH_USER_DETAILS") {
        Router.push("/admin/login?redirect=true");
        dispatch(clearStates());
      }
    }, [error]);

    useEffect(() => {
      if (localStorage.getItem("kyc_acccess_token")) {
        // Check if token exists in localStorage
        !userDetails && dispatch(fetchUserDetails());
      } else {
        Router.push("/admin/login?redirect=true"); // Otherwise, if token doesn't exist, re-route to login
      }
    }, []);
    return isAuthorized ? <Component {...props} /> : <PageLoadingAnimation />; // While waiting, show loading animation
  };
};
