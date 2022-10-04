import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "redux/slices/analyticsSlice";

const periodOptions = [
  { name: "Per day", display: "for today", value: "day" },
  { name: "Per week", display: "for this week", value: "week" },
  { name: "Per month", display: "for this month", value: "month" },
  { name: "Per year", display: "for this year", value: "year" },
  { name: "Per lifetime", display: "for the lifetime", value: "lifetime" },
];

export default function useDataAnalyticsHook() {
  const dispatch = useDispatch();
  const { analytics } = useSelector((state) => state.analytics);

  const [period, setPeriod] = useState("day");

  useEffect(() => {
    dispatch(fetchAnalytics({ period }));
  }, [period]);

  return {
    analytics,
    periodOptions,
    period,
    setPeriod,
    cardPeriodText: periodOptions.find(({ value }) => value === period).display,
  };
}
