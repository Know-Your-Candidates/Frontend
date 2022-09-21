import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "redux/slices/candidateSlice";

const filters = [
  "gender",
  "min_age",
  "max_age",
  "year",
  "position",
  "party",
  "qualifications",
  "state",
  "senatorial_district",
  "federal_constituency",
  "state_constituency",
  "lga",
  "ward",
  "polling_unit",
];

export default function useSearch() {
  const { candidates } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedAspirant, setSelectedAspirant] = useState(null);
  const { query: urlQuery } = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    if (urlQuery.query) setQuery(urlQuery.query);
  }, [urlQuery]);

  useEffect(() => {
    dispatch(
      fetchCandidates({
        page: 1,
      })
    );
  }, [filters]);

  const changeFilterValue = (key, value) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
  };

  const backToSearchResults = () => {
    setSelectedAspirant(null);
  };

  return {
    query,
    setQuery,
    changeFilterValue,
    candidates,
    selectedAspirant,
    setSelectedAspirant,
    backToSearchResults,
  };
}
