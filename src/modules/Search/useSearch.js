import React, { useState } from "react";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [selectedAspirant, setSelectedAspirant] = useState(null);

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
