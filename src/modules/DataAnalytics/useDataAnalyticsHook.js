import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "redux/slices/analyticsSlice";

export default function useDataAnalyticsHook() {
  const dispatch = useDispatch();
  const { analytics, error } = useSelector((state) => state.analytics);

  const [range, setRange] = useState(null);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, []);

  console.log(analytics);

  return { analytics, range, setRange };
}
