import React from "react";

const Search = ({ search, handleSearch, searchInput }) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
