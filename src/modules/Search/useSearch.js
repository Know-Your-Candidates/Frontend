import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCandidates,
  fetchFilterOptions,
} from "redux/slices/candidateSlice";
import debounce from "lodash.debounce";

const filters = {
  gender: ["Male", "Female"],
  age_bracket: ["18 - 30", "30 - 45", "46 - 59", "60 - 79", "80 +"],
  year: [],
  position: [],
  party: [],
  qualifications: [],
  state: [],
  senatorial_district: [],
  federal_constituency: [],
  state_constituency: [],
  lga: [],
  ward: [],
  polling_unit: [],
};

export default function useSearchHook() {
  const { candidates, loading } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [filterList, setFilterList] = useState({});
  const [filterOptions, setFilterOptions] = useState(filters);
  const [selectedAspirant, setSelectedAspirant] = useState(null);
  const { query: urlQuery } = useRouter();

  const fetchInitialOptions = async () => {
    try {
      const results = await Promise.all(
        Object.keys(filterOptions)
          .slice(2, 7)
          .map((key) => {
            return dispatch(fetchFilterOptions({ filter: key })).unwrap();
          })
      );

      changeFilterOptions(Object.assign({}, ...results));
    } catch (error) {}
  };

  useEffect(() => {
    fetchInitialOptions();
  }, []);

  useEffect(() => {
    if (urlQuery.query) setQuery(urlQuery.query);
  }, [urlQuery]);

  useEffect(() => {
    dispatch(
      fetchCandidates({
        page: 1,
        name: query || undefined,
        ...filterList,
      })
    );
  }, [filterList]);

  const debouncedOnChange = useCallback(
    debounce((value) => {
      dispatch(
        fetchCandidates({
          page: 1,
          name: value || undefined,
          ...filterList,
        })
      );
    }, 300),
    []
  );

  const changeFilterOptions = (updates) => {
    setFilterOptions((prev) => ({ ...prev, ...updates }));
  };

  const updateFilterList = (updates) => {
    setFilterList(updates);
  };

  const backToSearchResults = () => {
    setSelectedAspirant(null);
  };

  return {
    query,
    setQuery,
    debouncedOnChange,
    filterOptions,
    changeFilterOptions,
    filterList,
    updateFilterList,
    candidates,
    isLoading: loading === "FETCH_CANDIDATES",
    selectedAspirant,
    setSelectedAspirant,
    backToSearchResults,
  };
}
