import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "redux/slices/analyticsSlice";

export default function useDataAnalyticsHook() {
  const dispatch = useDispatch();
  const { analytics, error } = useSelector((state) => state.analytics);

  const [period, setPeriod] = useState("day");

  useEffect(() => {
    dispatch(fetchAnalytics({ period }));
  }, [period]);

  console.log(analytics);

  return { analytics, period, setPeriod };
}
