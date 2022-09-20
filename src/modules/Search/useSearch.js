import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "redux/slices/candidateSlice";

export default function useSearch() {
  const { candidates } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedAspirant, setSelectedAspirant] = useState(null);
  const { query: urlQuery } = useRouter();

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

  const backToSearchResults = () => {
    setSelectedAspirant(null);
  };

  return {
    query,
    setQuery,
    selectedAspirant,
    setSelectedAspirant,
    backToSearchResults,
  };
}
