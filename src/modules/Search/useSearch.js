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

export default function useSearchHook(urlQuery) {
  const [page, setPage] = useState(0);
  const { candidates, loading } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [query, setQuery] = useState(urlQuery || "");
  const [filterList, setFilterList] = useState({});
  const [filterOptions, setFilterOptions] = useState(filters);
  const [selectedAspirant, setSelectedAspirant] = useState(null);

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
    dispatch(
      fetchCandidates({
        page: 1,
        name: query || undefined,
        ...filterList,
      })
    );
    setPage(0);
  }, [filterList]);

  const debouncedOnChange = useCallback(
    debounce(async (value) => {
      await dispatch(
        fetchCandidates({
          page: 1,
          name: value || undefined,
          ...filterList,
        })
      ).unwrap();

      setPage(0);
    }, 300),
    [filterList]
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

  const handlePageClick = async ({ selected }) => {
    await dispatch(
      fetchCandidates({
        page: selected + 1,
        name: query || undefined,
        ...filterList,
      })
    ).unwrap();
    window.scrollTo(0, 0); //Always start at the top when a page changes
    setPage(selected);
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
    page,
    setPage,
    handlePageClick,
  };
}
